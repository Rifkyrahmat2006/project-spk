<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Google\Auth\AccessToken;

class GoogleLoginController extends Controller
{
    /**
     * Authenticate user using Google Identity Services ID Token.
     */
    public function authenticate(Request $request)
    {
        $credential = $request->credential;

        if (!$credential) {
            return back()->withErrors(['email' => 'Gagal menerima data dari Google.']);
        }

        try {
            // Verify ID Token using official Google Auth library
            $accessToken = new AccessToken();
            $payload = $accessToken->verify($credential, [
                'audience' => config('services.google.client_id')
            ]);
            
            if (!$payload || !isset($payload['email'])) {
                throw new \Exception('Token tidak valid atau telah kadaluarsa.');
            }

            $email = $payload['email'];
            $name = $payload['name'] ?? 'User';
            $googleId = $payload['sub'];
            $avatar = $payload['picture'] ?? null;

            // Validate domain (dosen @unsoed.ac.id, mahasiswa @mhs.unsoed.ac.id)
            if (!Str::endsWith($email, ['@unsoed.ac.id', '@mhs.unsoed.ac.id'])) {
                return back()->withErrors(['email' => 'Hanya email @unsoed.ac.id atau @mhs.unsoed.ac.id yang diizinkan.']);
            }

            // Find or create user
            $user = User::where('email', $email)->first();

            if ($user) {
                $user->update([
                    'google_id' => $googleId,
                    'avatar' => $avatar,
                    'email_verified_at' => $user->email_verified_at ?: now(),
                ]);
            } else {
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $googleId,
                    'avatar' => $avatar,
                    'nim' => explode('@', $email)[0],
                    'password' => bcrypt(Str::random(24)),
                    'email_verified_at' => now(),
                    'is_active' => true,
                ]);
            }

            if (!$user->is_active) {
                return back()->withErrors(['email' => 'Akun dinonaktifkan.']);
            }

            Auth::login($user, true);
            session()->regenerate();
            session()->save();

            $user->update(['last_login_at' => now()]);

            if ($user->role === 'superadmin' || $user->role === 'admin') {
                return redirect()->intended('/dashboard');
            }

            return redirect()->intended('/portal');

        } catch (\Exception $e) {
            return back()->withErrors(['email' => 'Otentikasi gagal: ' . $e->getMessage()]);
        }
    }
}

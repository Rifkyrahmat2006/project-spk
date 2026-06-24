import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useInitials } from '@/hooks/use-initials';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
    passwordRules: string;
};

export default function ProfileIndex({
    passwordRules,
}: {
    passwordRules: string;
}) {
    const { auth } = usePage<PageProps>().props;
    const getInitials = useInitials();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    // Profile form
    const profileForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
        username: auth.user.username || '',
    });

    // Password form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function handleAvatarClick() {
        fileInputRef.current?.click();
    }

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);

        // Upload
        setUploading(true);
        const formData = new FormData();
        formData.append('avatar', file);
        router.post('/profile/avatar', formData, {
            preserveScroll: true,
            onSuccess: () => {
                setUploading(false);
                setAvatarPreview(null);
                setAvatarVersion((v) => v + 1);
                router.reload({ only: ['auth'] });
            },
            onError: () => {
                setUploading(false);
                setAvatarPreview(null);
            },
        });
    }

    function handleProfileSubmit(e: React.FormEvent) {
        e.preventDefault();
        profileForm.patch('/profile', {
            preserveScroll: true,
        });
    }

    function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        passwordForm.put('/profile/password', {
            preserveScroll: true,
            onSuccess: () =>
                passwordForm.reset(
                    'current_password',
                    'password',
                    'password_confirmation',
                ),
        });
    }

    const [avatarVersion, setAvatarVersion] = useState(0);
    const avatarSrc =
        avatarPreview ||
        (auth.user.avatar
            ? `${auth.user.avatar}?t=${avatarVersion}`
            : undefined);

    return (
        <>
            <Head title="Profile" />

            <div className="space-y-8">
                {/* Avatar Section */}
                <div>
                    <Heading
                        title="Profile Photo"
                        description="Upload a photo to personalize your account"
                    />

                    <div className="mt-4 flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={avatarSrc} alt={auth.user.name} />
                            <AvatarFallback className="text-lg">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAvatarClick}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Change Photo'}
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                JPG, PNG, or WebP. Max 2MB.
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Profile Info Section */}
                <div>
                    <Heading
                        variant="small"
                        title="Personal Information"
                        description="Update your name, username, and email address"
                    />

                    <form
                        onSubmit={handleProfileSubmit}
                        className="mt-4 space-y-6"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={profileForm.data.name}
                                onChange={(e) =>
                                    profileForm.setData('name', e.target.value)
                                }
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />
                            <InputError message={profileForm.errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={profileForm.data.username}
                                onChange={(e) =>
                                    profileForm.setData(
                                        'username',
                                        e.target.value,
                                    )
                                }
                                placeholder="username"
                                autoComplete="username"
                            />
                            <InputError message={profileForm.errors.username} />
                            <p className="text-xs text-muted-foreground">
                                Letters, numbers, and hyphens only.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) =>
                                    profileForm.setData('email', e.target.value)
                                }
                                required
                                autoComplete="email"
                                placeholder="Email address"
                            />
                            <InputError message={profileForm.errors.email} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={profileForm.processing}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>

                <Separator />

                {/* Password Section */}
                <div>
                    <Heading
                        variant="small"
                        title="Change Password"
                        description="Ensure your account is using a long, random password"
                    />

                    <form
                        onSubmit={handlePasswordSubmit}
                        className="mt-4 space-y-6"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">
                                Current password
                            </Label>
                            <PasswordInput
                                id="current_password"
                                value={passwordForm.data.current_password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'current_password',
                                        e.target.value,
                                    )
                                }
                                autoComplete="current-password"
                                placeholder="Current password"
                            />
                            <InputError
                                message={passwordForm.errors.current_password}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New password</Label>
                            <PasswordInput
                                id="password"
                                value={passwordForm.data.password}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'password',
                                        e.target.value,
                                    )
                                }
                                autoComplete="new-password"
                                placeholder="New password"
                            />
                            <InputError
                                message={passwordForm.errors.password}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm new password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) =>
                                    passwordForm.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                autoComplete="new-password"
                                placeholder="Confirm new password"
                            />
                            <InputError
                                message={
                                    passwordForm.errors.password_confirmation
                                }
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={passwordForm.processing}>
                                Update Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

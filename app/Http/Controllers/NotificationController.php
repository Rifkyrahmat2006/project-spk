<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a paginated list of notifications for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->through(fn ($n) => [
                'id' => $n->id,
                'user_id' => $n->user_id,
                'type' => $n->type,
                'title' => $n->title,
                'body' => $n->body,
                'data' => $n->data,
                'read_at' => $n->read_at,
                'created_at' => $n->created_at,
            ]);

        $unreadCount = $user->notifications()
            ->unread()
            ->count();

        return Inertia::render('spk/notifications/Index', [
            'notifications' => $notifications,
            'unreadCount' => $unreadCount,
        ]);
    }

    /**
     * Mark a single notification as read.
     */
    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return back();
    }

    /**
     * Mark all notifications as read for the authenticated user.
     */
    public function markAllAsRead(Request $request)
    {
        $request->user()->notifications()
            ->unread()
            ->update(['read_at' => now()]);

        return back();
    }

    /**
     * Get unread notification count (for header badge).
     */
    public function unreadCount(Request $request)
    {
        $count = $request->user()
            ->notifications()
            ->unread()
            ->count();

        return response()->json(['unreadCount' => $count]);
    }
}

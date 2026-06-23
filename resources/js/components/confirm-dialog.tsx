import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    destructive?: boolean;
    loading?: boolean;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    confirmText = 'Ya',
    cancelText = 'Batal',
    destructive = false,
    loading = false,
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-start gap-3">
                        <div
                            className={`flex shrink-0 items-center justify-center rounded-full p-2 ${destructive ? 'bg-red-100' : 'bg-blue-100'}`}
                        >
                            <AlertTriangle
                                className={`size-5 ${destructive ? 'text-red-600' : 'text-blue-600'}`}
                            />
                        </div>
                        <div className="pt-1">
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {description}
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={loading}
                        className={
                            destructive
                                ? 'bg-red-600 hover:bg-red-700'
                                : undefined
                        }
                    >
                        {loading ? 'Memproses...' : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { Code2, Save, StoreIcon, Trash } from "lucide-react"
import { useForm } from "react-hook-form"

import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingsFormValues> ({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Toko berhasil di update");
        } catch (error) {
            toast.error("Cek kembali data yang diinput");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push('/');
            toast.success("Toko berhasil dihapus");
        } catch (error) {
            toast.error("Cek kembali data dan koneksi mu");
        } finally {
            setOpen(false);
            setLoading(false);
        }
    }

    const currentName = form.watch("name");

    return (
        <>
        <AlertModal
        isOpen={open}
        onClose ={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />

        <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-x-3">
                    <div className="p-2.5 bg-slate-100 rounded-xl text-slate-700">
                        <StoreIcon className="h-6 w-6"/>
                    </div>
                    <Heading 
                        title={currentName || "Pengaturan Toko"} 
                        description="Kelola informasi dan prefensi toko anda!"
                    />
            </div>
            <Button 
                disabled={loading} 
                variant="destructive" 
                size="sm" 
                onClick={() => setOpen(true)}
                className="rounded-xl px-3 hover:bg-rose-600 transition-all shadow-sm"
                >
                    <Trash className="h-4 w-4 mr-1.5"/>
                    Hapus Toko
            </Button>
        </div>

        <Separator className="bg-slate-200/60"/>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-medium text-slate-700">Nama Toko</FormLabel>
                                <FormControl>
                                    <Input 
                                    placeholder="Nama Toko" 
                                    disabled={loading} 
                                    {...field}
                                    className="rounded-xl border-slate-200 focus:ring-slate-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                <Button
                    disabled={loading}
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold px-5 py-2.5 transition-all shadow-sm"
                    >
                    <Save className="mr-2 h-4 w-4"/>
                    Simpan Perubahan
                    </Button>
                </form>
            </Form>
        </div>

        <Separator className="bg-slate-200/60"/>

        <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Code2 className="h-5 w-5"/>
                </div>
                <Heading 
                    title="API Toko"
                    description="Panggilan API Publik untuk toko ini."
                />
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <ApiAlert 
                title="PUBLIC_API_URL" 
                description={`${origin}/api/${params.storeId}`} 
                variant="public"
                />
                </div>
            </div>
        </div>
        </>
    );
}
"use client";
import { Billboard, Store } from "@prisma/client";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-model";
import ImageUpload from "@/components/ui/image-upload";
//zod schema validation
const formSchema = z.object({
  label: z.string().min(3).max(255),
  imageUrl: z.string().min(3),
});
type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardsFormProps {
  initialData: Billboard | null;
}
const BillboardsForm: React.FC<BillboardsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit Billboard" : "New Billboard";
  const description = initialData ? "Edit Billboard" : "New Billboard";
  const toastMessage = initialData ? "Billboard Updated" : "Billboard created";
  const action = initialData ? "Save changes" : "Create Billboard";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/${params.storeId}/billboards`, {
          method: "POST",
          body: JSON.stringify(data),
        });
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //delete store
  const onDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
        method: "DELETE",
      });
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you have deleted all the categories using this billboard first"
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            disabled={loading}
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardsForm;

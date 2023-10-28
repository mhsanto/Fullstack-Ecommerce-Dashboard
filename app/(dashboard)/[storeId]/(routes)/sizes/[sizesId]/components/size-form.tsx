"use client";
import {  Size } from "@prisma/client";
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
  name: z.string().min(1),
  value: z.string().min(1),
});
type SizesFormValues = z.infer<typeof formSchema>;

interface SizesFormProps {
  initialData: Size | null;
}
const SizesForm: React.FC<SizesFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit Size" : "New Size";
  const description = initialData ? "Edit Size" : "New Size";
  const toastMessage = initialData ? "Size Updated" : "Size created";
  const action = initialData ? "Save changes" : "Create Size";

  const form = useForm<SizesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  const onSubmit = async (data: SizesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/${params.storeId}/sizes/${params.sizesId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/${params.storeId}/sizes`, {
          method: "POST",
          body: JSON.stringify(data),
        });
      }

      router.refresh();
      router.push(`/${params.storeId}/sizes`);
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
      await fetch(`/api/${params.storeId}/sizes/${params.sizesId}`, {
        method: "DELETE",
      });
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you have deleted all the products using this sizes first"
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
         
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="size name"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="size value"
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

export default SizesForm;

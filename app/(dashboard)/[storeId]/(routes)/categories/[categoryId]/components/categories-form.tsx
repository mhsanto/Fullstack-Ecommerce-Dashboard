"use client";
import { Billboard, Category, Store } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
//zod schema validation
const formSchema = z.object({
  name: z.string().min(3).max(255),
  billboardId: z.string().min(3),
});
type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoriesFormProps {
  initialData: Category | null;
  billboards: Billboard[] ;
}
const CategoriesForm: React.FC<CategoriesFormProps> = ({
  initialData,
  billboards,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit Category" : "New Category";
  const description = initialData ? "Edit Category" : "New Category";
  const toastMessage = initialData ? "Category Updated" : "Category created";
  const action = initialData ? "Save changes" : "Create Category";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/${params.storeId}/categories/${params.billboardId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      }

      await fetch(`/api/${params.storeId}/categories`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      router.refresh();
      router.push(`/${params.storeId}/categories`);
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
      await fetch(`/api/${params.storeId}/categories/${params.categoryId}`, {
        method: "DELETE",
      });
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you have deleted all the products using this Category first"
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
                      placeholder="Category name"
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
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a billboard"
                          />
                          <SelectContent>
                            {billboards.map((billboard) => (
                              <SelectItem
                                key={billboard.id}
                                value={billboard.id}
                              >
                                {billboard.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </FormControl>
                    </Select>
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

export default CategoriesForm;

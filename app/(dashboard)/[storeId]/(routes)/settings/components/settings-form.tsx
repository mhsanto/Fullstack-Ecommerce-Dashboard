"use client";
import { Store } from "@prisma/client";
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
const formSchema = z.object({
  name: z.string().min(3).max(255),
});
type SettingFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Store;
}
const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data: SettingFormValues) => [console.log(data)];
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage Store preferences" />
        <Button
          variant="destructive"
          disabled={loading}
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
                      placeholder="Store name"
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
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;

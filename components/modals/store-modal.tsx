"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import { userStoreModal } from "@/hooks/useStore-modal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

//zod schemas
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
//zod schemas ends here
const StoreModal = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch("api/stores", {
        method: "POST",
        headers: {
          ContentType: "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());
      window.location.assign(`/${response.id}`);
      console.log(response);
    } catch (error: any) {
      toast.error(error.message);
      console.log(`[store-modal-onSubmit]`, error);
    } finally {
      setLoading(false);
    }
  };
  const isOpen = userStoreModal((state) => state.isOpen);
  const onClose = userStoreModal((state) => state.onClose);
  return (
    <Modal
      isOpen={isOpen}
      title="Create Store"
      description="Add a new store to manage products and categories"
      onClose={() => onClose}
    >
      <div>
        <div className="space-y-4 py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your store name</FormLabel>

                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Store Name"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { z } from "zod";
import { questionSchema } from "@/lib/schemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { createQuestion } from "@/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

const type: any = "create";

type Props = {
  mongoUserId: string;
};

const Question = ({ mongoUserId }: Props) => {
  const richEditorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof questionSchema>) => {
    setIsSubmitting(true);

    const { title, explanation: content, tags } = values;

    try {
      await createQuestion({
        title,
        content,
        tags,
        author: JSON.parse(mongoUserId),
        path: pathName,
      });

      router.push("/");
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-9 flex flex-col">
                <FormLabel>
                  <p className="paragraph-semibold text-dark400_light800 mb-[14px]">
                    Question Title <span className="text-primary-500">*</span>
                  </p>
                </FormLabel>
                <FormControl className="relative">
                  <Input
                    className="background-light800_dark400 text-dark100_light900 aria-[invalid=false]:light-border-2 no-focus mb-[10px] h-[53px] w-full rounded-md border px-6 py-4 text-base focus:outline-none aria-[invalid=true]:border-red-500"
                    placeholder="Enter your question here..."
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
                <FormDescription className="text-light400_light500 body-regular">
                  Be specific and imagine you’re asking a question to another
                  person.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="mb-9 flex flex-col">
                <FormLabel>
                  <p className="paragraph-semibold text-dark400_light800 mb-[14px]">
                    Detailed explanation of your problem{" "}
                    <span className="text-primary-500">*</span>
                  </p>
                </FormLabel>
                <FormControl className="relative">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      richEditorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue=""
                    init={{
                      height: 290,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family: Inter, font-size: 16px",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
                <FormDescription className="text-light400_light500 body-regular">
                  Introduce the problem and expand on what you put in the title.
                  Minimum 20 characters.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="mb-9 flex flex-col">
                <FormLabel>
                  <p className="paragraph-semibold text-dark400_light800 mb-[14px]">
                    Tags <span className="text-primary-500">*</span>
                  </p>
                </FormLabel>
                <FormControl className="relative">
                  <>
                    <Input
                      className="background-light800_dark400 text-dark100_light900 aria-[invalid=false]:light-border-2 no-focus mb-[10px] h-[53px] w-full rounded-md border px-6 py-4 text-base focus:outline-none aria-[invalid=true]:border-red-500"
                      placeholder="Enter your tags here..."
                      onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((tag) => (
                          <span
                            key={tag}
                            className="background-light800_dark300 text-dark400_light700 hover:background-light700_dark400 flex cursor-pointer gap-2 rounded-md px-2 py-1 text-sm"
                          >
                            {tag}
                            <Image
                              src="/assets/icons/close.svg"
                              width={12}
                              height={12}
                              alt="close"
                              className="invert-0 dark:invert"
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>

                <FormMessage className="text-red-500" />
                <FormDescription className="text-light400_light500 body-regular">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="mt-[72px] flex justify-end">
            <Button type="submit" className="primary-gradient text-light-900">
              {isSubmitting ? (
                <>{type === "edit" ? "Editing" : "Posting"}</>
              ) : (
                <>{type === "edit" ? "Edit a Question" : "Ask a Question"}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Question;

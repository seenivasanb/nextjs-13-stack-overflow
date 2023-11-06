"use client";
import { createAnswer } from "@/actions/answer.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTheme } from "@/context/theme-provider";
import { AnswerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  question: string;
  questionId: string;
  authorId: string;
};

const Answer = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname();
  const richEditorRef = useRef(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode } = useTheme();

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      const editor = richEditorRef.current as any;
      editor.setContent("");
    } catch (error) {
      console.log("Failed to adding the answers\n", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="mb-9 flex flex-col">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800 mb-[14px]">
                  Write your answer here:
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
                    content_style: "body { font-family: Inter, font-size: 16px",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-[30px] flex justify-end">
          <Button type="submit" className="primary-gradient text-light-900">
            {isSubmitting ? "Posting" : "Post Answer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Answer;

"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TextareaAutosize from "react-textarea-autosize";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { createPost } from "@/lib/actions/createPost";

export default function Page() {
  const [content, setContent] = useState("")
  const [contentLength, setContentLength] = useState(0)
  const [preview, setPreview] = useState(true)
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  })

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setContentLength(value.length)
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        記事作成
      </h1>
      <form className="space-y-4" action={formAction}>
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input type="text" id="title" name="title" />
          {state.errors.title && (
            <p className="text-sm text-red-500">{state.errors.title.join(",")}</p>
          )}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input type="file" id="topImage" name="topImage" accept="image/*" />
          {state.errors.topImage && (
            <p className="text-sm text-red-500">{state.errors.topImage.join(",")}</p>
          )}
        </div>
        <div>
          <Label htmlFor="content">内容</Label>
          <TextareaAutosize
            id="content"
            name="content"
            className="w-full border p-2"
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-sm text-red-500">{state.errors.content.join(",")}</p>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 mt-2">
          文字数: {contentLength}
        </div>
        <div>
          <Button type="button" onClick={() => setPreview(!preview)} variant="outline">
            {preview ? "閉じる" : "プレビュー"}
          </Button>
        </div>
        {preview && (
          <div className="border p-4 bg-gray-50 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >{content}</ReactMarkdown>
          </div>
        )}
        <Button type="submit" className="bg-blue-500 text-white">
          保存
        </Button>
      </form>
    </div>
  )
}

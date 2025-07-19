"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TextareaAutosize from "react-textarea-autosize";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { Post } from "@/types/post";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updatePost } from "@/lib/actions/updatePost";

type Props = {
  post: Post
}

export default function EditPostForm(props: Props) {
  const { post } = props
  const [title, setTitle] = useState(post.title)
  const [topImagePreview, setTopImagePreview] = useState(post.topImage)
  const [content, setContent] = useState(post.content)
  const [contentLength, setContentLength] = useState(post.content.length)
  const [published, setPublished] = useState(post.published)
  const [preview, setPreview] = useState(true)
  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  })

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setContentLength(value.length)
  }

  const handleTopImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setTopImagePreview(url)
    }
  }

  useEffect(() => {
    return () => {
      if (topImagePreview && topImagePreview !== post.topImage) {
        URL.revokeObjectURL(topImagePreview)
      }
    }
  }, [topImagePreview, post.topImage])

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        記事編集
      </h1>
      <form className="space-y-4" action={formAction}>
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            className="w-full border p-2"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {state.errors.title && (
            <p className="text-sm text-red-500">{state.errors.title.join(",")}</p>
          )}
        </div>
        <div>
          <Label htmlFor="topImage">トップ画像</Label>
          <Input
            className="w-full border p-2"
            type="file"
            id="topImage"
            name="topImage"
            accept="image/*"
            onChange={handleTopImageChange}
          />
          {topImagePreview && (
            <div className="mt-2">
              <Image
                src={topImagePreview}
                alt="トップ画像"
                width={0}
                height={0}
                sizes="200px"
                className="w-[200px]"
                priority
              />
            </div>
          )}
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
        <RadioGroup name="published" value={published.toString()} onValueChange={(value) => setPublished(value === "true")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-true"/>
            <Label htmlFor="published-true">公開</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-false"/>
            <Label htmlFor="published-false">非公開</Label>
          </div>
        </RadioGroup>
        <Button type="submit" className="bg-blue-500 text-white">
          更新
        </Button>
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldTopImage" value={post.topImage || ""} />
      </form>
    </div>
  )
}

"use client";

import React, { FormEvent } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import "prosemirror-view/style/prosemirror.css";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Menu,
  Redo2,
  Undo2,
} from "lucide-react";
import Underline from "@tiptap/extension-underline";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/skeleton";
import { unstable_noStore } from "next/cache";

export interface HeroData {
  heading1: string;
  paragraph1: string;
  button1: string;
  button2: string;
}

export interface ContentData {
  heading2: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  heading3: string;
  paragraph5: string;
  paragraph6: string;
  heading4: string;
  paragraph7: string;
  paragraph8: string;
  announcements: string;
  footerHeading1: string;
  footerHeading2: string;
  footerParagraph1: string;
  footerParagraph2: string;
}

export interface HomePageContent {
  hero: HeroData;
  content: ContentData;
}

interface validateJwtResponse {
  isValid: boolean;
}

interface RefreshTokenResponse {
  token: string;
}

async function refreshTokenFn(token: string | null): Promise<string | null> {
  if (!token) return null;
  const refreshToken = token;

  try {
    const response = await fetch(
      "https://api.creeksideinverness.org/api/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: RefreshTokenResponse = await response.json();
    return data.token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

const RichTextToolbar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-2 p-2 bg-gray-50 border-b border-gray-200 rounded-t-md shadow-sm">
      <div className="flex items-center gap-1 p-1 bg-white rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("bold")
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("italic")
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("underline")
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Underline"
        >
          <u>U</u>
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white rounded-md shadow-inner">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Heading 2"
        >
          H2
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("bulletList")
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Bullet List"
        >
          • <Menu className="w-4 text-gray-950 inline-block ml-1" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("orderedList")
              ? "bg-gray-200 text-gray-950"
              : "bg-white text-gray-700"
          }`}
          title="Ordered List"
        >
          1. <Menu className="w-4 text-gray-950 inline-block ml-1" />
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white rounded-md shadow-inner">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 transition-colors bg-white text-gray-700"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 transition-colors bg-white text-gray-700"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [heroData, setHeroData] = React.useState<HeroData>({
    heading1: "",
    paragraph1: "",
    button1: "",
    button2: "",
  });

  const [contentData, setContentData] = React.useState<ContentData>({
    heading2: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    heading3: "",
    paragraph5: "",
    paragraph6: "",
    heading4: "",
    paragraph7: "",
    paragraph8: "",
    announcements: "",
    footerHeading1: "",
    footerHeading2: "",
    footerParagraph1: "",
    footerParagraph2: "",
  });
  const [isCheckingAuth, setIsCheckingAuth] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const [successMsg, setSuccessMsg] = React.useState<string>("");

  React.useEffect(() => {
    const validateToken = async () => {
      let token = sessionStorage.getItem("token");
      const refreshToken = sessionStorage.getItem("refreshToken");

      console.log("Admin - Initial token:", token);
      console.log("Admin - Refresh token:", refreshToken);

      if (!token) {
        console.log("Admin - No token, redirecting to login");
        window.location.replace("/login");
        return;
      }

      try {
        let response = await fetch(
          "https://api.creeksideinverness.org/api/validate-jwt",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          }
        );

        console.log("Admin - Validate JWT status:", response.status);

        if (response.status === 401) {
          console.log("Admin - Token expired, attempting refresh");
          const newToken = await refreshTokenFn(refreshToken);
          if (newToken) {
            console.log("Admin - New token:", newToken);
            sessionStorage.setItem("token", newToken);
            token = newToken;
            response = await fetch(
              "https://api.creeksideinverness.org/api/validate-jwt",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
                body: JSON.stringify({ token }),
              }
            );
          } else {
            console.log("Admin - Refresh failed");
            sessionStorage.clear();
            throw new Error("Token refresh failed");
          }
        }

        if (!response.ok) {
          console.log("Admin - Validation failed, status:", response.status);
          sessionStorage.clear();
          window.location.replace("/login");
          return;
        }

        const data: validateJwtResponse = await response.json();
        console.log("Admin - Validation response:", data);
        if (!data.isValid) {
          console.log("Admin - Token invalid, redirecting to login");
          sessionStorage.clear();
          window.location.replace("/login");
          return;
        }

        console.log("Admin - Token validated successfully");
        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Admin - Validation error:", error);
        sessionStorage.clear();
        window.location.replace("/login");
      }
    };

    validateToken();
  }, []);

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["content"],
    queryFn: async (): Promise<HomePageContent> => {
      const response = await fetch(
        "https://api.creeksideinverness.org/api/content",
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      return response.json();
    },
  });

  React.useEffect(() => {
    if (data) {
      setHeroData(data.hero);
      setContentData(data.content);

      heroEditors.paragraph1?.commands.setContent(data.hero.paragraph1 || "");
      contentEditors.paragraph2?.commands.setContent(
        data.content.paragraph2 || ""
      );
      contentEditors.paragraph3?.commands.setContent(
        data.content.paragraph3 || ""
      );
      contentEditors.paragraph4?.commands.setContent(
        data.content.paragraph4 || ""
      );
      contentEditors.paragraph5?.commands.setContent(
        data.content.paragraph5 || ""
      );
      contentEditors.paragraph6?.commands.setContent(
        data.content.paragraph6 || ""
      );
      contentEditors.paragraph7?.commands.setContent(
        data.content.paragraph7 || ""
      );
      contentEditors.paragraph8?.commands.setContent(
        data.content.paragraph8 || ""
      );
      contentEditors.announcements?.commands.setContent(
        data.content.announcements || ""
      );
      contentEditors.footerParagraph1?.commands.setContent(
        data.content.footerParagraph1 || ""
      );
      contentEditors.footerParagraph2?.commands.setContent(
        data.content.footerParagraph2 || ""
      );
    }
    if (queryError) {
      alert("Failed to load content");
    }
  }, [data, queryError]);

  const heroEditors = {
    paragraph1: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: heroData.paragraph1,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setHeroData((prev) => ({ ...prev, paragraph1: editor.getHTML() })),
    }),
  };

  const contentEditors = {
    paragraph2: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph2,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph2: editor.getHTML() })),
    }),
    paragraph3: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph3,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph3: editor.getHTML() })),
    }),
    paragraph4: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph4,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph4: editor.getHTML() })),
    }),
    paragraph5: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph5,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph5: editor.getHTML() })),
    }),
    paragraph6: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph6,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph6: editor.getHTML() })),
    }),
    paragraph7: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph7,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph7: editor.getHTML() })),
    }),
    paragraph8: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.paragraph8,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({ ...prev, paragraph8: editor.getHTML() })),
    }),
    announcements: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.announcements,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({
          ...prev,
          announcements: editor.getHTML(),
        })),
    }),
    footerParagraph1: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.footerParagraph1,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({
          ...prev,
          footerParagraph1: editor.getHTML(),
        })),
    }),
    footerParagraph2: useEditor({
      extensions: [
        StarterKit.configure({
          paragraph: { HTMLAttributes: { class: "min-h-[1em]" } },
        }),
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: contentData.footerParagraph2,
      immediatelyRender: false,
      onUpdate: ({ editor }) =>
        setContentData((prev) => ({
          ...prev,
          footerParagraph2: editor.getHTML(),
        })),
    }),
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!token) {
      setError("You are not Authenticated");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      let response = await fetch(
        "https://api.creeksideinverness.org/api/update-content",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hero: heroData, content: contentData }),
        }
      );

      if (response.status === 401) {
        const newToken = await refreshTokenFn(refreshToken);
        if (newToken) {
          sessionStorage.setItem("token", newToken);
          token = newToken;

          response = await fetch(
            "https://api.creeksideinverness.org/api/update-content",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
              body: JSON.stringify({ hero: heroData, content: contentData }),
            }
          );
        } else {
          throw new Error("Token refresh failed");
        }
      }

      if (response.ok) {
        setSuccessMsg("Content Updated Successfully!");
        setTimeout(() => setSuccessMsg(""), 5000);
      } else {
        setError("Could not update");
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      setError("An error occurred while updating");
      setTimeout(() => setError(""), 5000);
    }
  };

  async function handleLogout() {
    const refreshToken = sessionStorage.getItem("refreshToken");
    try {
      const response = await fetch(
        "https://api.creeksideinverness.org/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (response.ok) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        window.location.replace("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full border-t-4 border-b-4 border-indigo-500 w-16 h-16 mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="float-end">
          <Skeleton width="120px" height="40px" />
        </div>
        <div className="max-w-4xl mx-auto">
          <Skeleton width="300px" height="36px" className="mb-8" />
          <div className="space-y-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton width="200px" height="28px" className="mb-6" />
              <div className="space-y-4">
                <Skeleton height="20px" />
                <Skeleton height="40px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Skeleton width="200px" height="28px" className="mb-6" />
              <div className="space-y-6">
                <Skeleton height="20px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="20px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="20px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
              </div>
            </div>
            <Skeleton width="150px" height="40px" className="mt-6" />
          </div>
        </div>
      </div>
    );
  }

  unstable_noStore();
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="float-end">
        <button
          className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Content Editor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Hero Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={heroData.heading1}
                  onChange={(e) =>
                    setHeroData((prev) => ({
                      ...prev,
                      heading1: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph
                </label>
                <RichTextToolbar editor={heroEditors.paragraph1} />
                <EditorContent
                  editor={heroEditors.paragraph1}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Button 1 Link
                </label>
                <input
                  type="text"
                  value={heroData.button1}
                  onChange={(e) =>
                    setHeroData((prev) => ({
                      ...prev,
                      button1: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Button 2 Link
                </label>
                <input
                  type="text"
                  value={heroData.button2}
                  onChange={(e) =>
                    setHeroData((prev) => ({
                      ...prev,
                      button2: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Content Section
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Heading 1
                </label>
                <input
                  type="text"
                  value={contentData.heading2}
                  onChange={(e) =>
                    setContentData((prev) => ({
                      ...prev,
                      heading2: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 1
                </label>
                <RichTextToolbar editor={contentEditors.paragraph2} />
                <EditorContent
                  editor={contentEditors.paragraph2}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 2
                </label>
                <RichTextToolbar editor={contentEditors.paragraph3} />
                <EditorContent
                  editor={contentEditors.paragraph3}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 3
                </label>
                <RichTextToolbar editor={contentEditors.paragraph4} />
                <EditorContent
                  editor={contentEditors.paragraph4}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Heading 2
                </label>
                <input
                  type="text"
                  value={contentData.heading3}
                  onChange={(e) =>
                    setContentData((prev) => ({
                      ...prev,
                      heading3: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 4
                </label>
                <RichTextToolbar editor={contentEditors.paragraph5} />
                <EditorContent
                  editor={contentEditors.paragraph5}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 5
                </label>
                <RichTextToolbar editor={contentEditors.paragraph6} />
                <EditorContent
                  editor={contentEditors.paragraph6}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Heading 3
                </label>
                <input
                  type="text"
                  value={contentData.heading4}
                  onChange={(e) =>
                    setContentData((prev) => ({
                      ...prev,
                      heading4: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 6
                </label>
                <RichTextToolbar editor={contentEditors.paragraph7} />
                <EditorContent
                  editor={contentEditors.paragraph7}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Paragraph 7
                </label>
                <RichTextToolbar editor={contentEditors.paragraph8} />
                <EditorContent
                  editor={contentEditors.paragraph8}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Announcements
                </label>
                <RichTextToolbar editor={contentEditors.announcements} />
                <EditorContent
                  editor={contentEditors.announcements}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Footer Heading 1
                </label>
                <input
                  type="text"
                  value={contentData.footerHeading1}
                  onChange={(e) =>
                    setContentData((prev) => ({
                      ...prev,
                      footerHeading1: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Footer Heading 2
                </label>
                <input
                  type="text"
                  value={contentData.footerHeading2}
                  onChange={(e) =>
                    setContentData((prev) => ({
                      ...prev,
                      footerHeading2: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Footer Paragraph 1
                </label>
                <RichTextToolbar editor={contentEditors.footerParagraph1} />
                <EditorContent
                  editor={contentEditors.footerParagraph1}
                  className="mt-1 ProseMirror"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Footer Paragraph 2
                </label>
                <RichTextToolbar editor={contentEditors.footerParagraph2} />
                <EditorContent
                  editor={contentEditors.footerParagraph2}
                  className="mt-1 ProseMirror"
                />
              </div>
              {error && <p className="text-red-500 mt-1">{error}</p>}
              {successMsg && (
                <p className="text-green-500 mt-1">{successMsg}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import React, { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/validations/profileSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    profilePhoto: string;
  };
  btnTitle: string;
}


const ProfileInfo = ({ user, btnTitle }: Props) => {

  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);
  const router=useRouter();
  const pathname=usePathname();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
      profilePhoto: user?.profilePhoto || "",
    },
  });

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFiles(Array.from(event.target.files));
      console.log(event.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result?.toString() || "";
        fieldChange(base64String);
      };
      reader.readAsDataURL(file);
    }
    console.log(user);
  };


  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const rawImage = values.profilePhoto;
    const hasChanged = isBase64Image(rawImage);
    // console.log(hasChanged);
    if (hasChanged) {
      const imgUpload = await startUpload(files);
      if (imgUpload && imgUpload[0].url) {
        values.profilePhoto = imgUpload[0].url;
      }
      console.log(values.profilePhoto);
    }
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profilePhoto,
      pathname
    })
    if(pathname==='/profile/edit')router.back();
    else router.replace('/');
  }

  return (
    <div className="p-10 bg-light-1 text-primary-500 rounded-2xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem className="flex md:flex-row flex-col items-center">
                <FormLabel>
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_photo"
                      height={96}
                      width={96}
                      style={{"borderRadius":"100%","height":"96px"}}
                      priority
                    />
                  ) : (
                    <Image
                      src="/assets/profile-active.svg"
                      alt="profile_photo"
                      height={96}
                      width={96}
                      className="rounded-full h-24 w-24"
                    />
                  )}
                </FormLabel>
                <FormControl className="ml-5">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload your picture"
                    onChange={(e) => handleImageUpload(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} className="text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} className="text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="shadcn"
                    {...field}
                    rows={5}
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500 min-w-full">
            {btnTitle}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfo;

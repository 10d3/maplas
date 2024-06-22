import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getToken } from "next-auth/jwt";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
const auth = async (req: Request) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const salt = process.env.NEXTAUTH_SALT || "default-salt"; // Use environment variable or a default value

  if (!secret) {
    console.error("NEXTAUTH_SECRET is not set");
    throw new UploadThingError("Internal Server Error: Missing Auth Secret");
  }

  const token = await getToken({ req, secret, salt });
  if (!token) {
    console.error("Unauthorized access attempt.");
    throw new UploadThingError("Unauthorized");
  }
  return { id: token.sub };
};


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

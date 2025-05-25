import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // Format the createdAt date or provide a fallback
  const formatMemberSince = (createdAt) => {
    if (!createdAt) return "N/A"; // Fallback if createdAt is undefined or null
    try {
      const date = new Date(createdAt);
      return isNaN(date.getTime()) ? "N/A" : date.toISOString().split("T")[0]; // Ensure valid date
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  // Log authUser for debugging (you can remove this after verifying)
  console.log("authUser:", authUser);

  return (
    <div className="min-h-screen pt-20 bg-base-100 flex items-center justify-center">
      <div className="max-w-xl mx-auto p-4 py-6">
        <div className="bg-base-300 rounded-xl p-14 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-1 text-base-content/70">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-28 rounded-full object-cover border-4 border-base-100"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/60">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-3 py-2 bg-base-200 rounded-lg border">{authUser?.fullName || "N/A"}</p>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-3 py-2 bg-base-200 rounded-lg border">{authUser?.email || "N/A"}</p>
            </div>
          </div>

          <div className="mt-4 bg-base-300 rounded-xl p-4">
            <h2 className="text-lg font-medium mb-3">Account Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-base-200">
                <span>Member Since</span>
                <span>{formatMemberSince(authUser?.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
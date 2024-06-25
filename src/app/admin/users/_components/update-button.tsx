"use client";

import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import {
  updateUserActiveStatus,
  updateUserApprovalStatus,
  updateUserVerificationStatus,
} from "@/actions/users";

type UpdateButtonProps = {
  userId: string;
  isActive: boolean;
  isApproved: boolean;
  isVerified: boolean;
};

const UpdateButton: FC<UpdateButtonProps> = ({
  userId,
  isActive,
  isApproved,
  isVerified,
}) => {
  return (
    <div className="-mt-px flex divide-x divide-gray-200">
      <div className="flex flex-col gap-y-1 w-0 flex-1 p-2 items-center">
        <h4 className="text-xs font-medium">isActive</h4>
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => updateUserActiveStatus(userId, checked)}
        />
      </div>
      <div className="flex flex-col gap-y-1 w-0 flex-1 p-2 items-center">
        <h4 className="text-xs font-medium">isApproved</h4>
        <Switch
          checked={isApproved}
          onCheckedChange={(checked) =>
            updateUserApprovalStatus(userId, checked)
          }
        />
      </div>
      <div className="flex flex-col gap-y-1 w-0 flex-1 p-2 items-center">
        <h4 className="text-xs font-medium">isVerified</h4>
        <Switch
          checked={isVerified}
          onCheckedChange={(checked) =>
            updateUserVerificationStatus(userId, checked)
          }
        />
      </div>
    </div>
  );
};

export default UpdateButton;

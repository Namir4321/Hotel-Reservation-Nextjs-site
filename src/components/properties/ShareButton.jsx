"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import { LuShare2 } from "react-icons/lu";
import { TwitterShareButton,EmailShareButton,FacebookShareButton,InstapaperShareButton,LinkedinShareButton,TwitterIcon,EmailIcon,LinkedinIcon,FacebookIcon,InstapaperIcon } from "react-share";
const ShareButton = ({propertyId,name}) => {
 const url=process.env.NEXT_PRODUCTION_WEBSITE_URL;
 const shareLink=`${url}/properties/${propertyId}`
    return (
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" size="icon" className="p-2">
            <LuShare2 />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          sideOffset={10}
          className="flex items-center gap-x-2 justify-center w-full"
        >
          <TwitterShareButton url={shareLink} title={name}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareLink} title={name}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton url={shareLink} title={name}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={shareLink} title={name}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </PopoverContent>
      </Popover>
    );
};

export default ShareButton;

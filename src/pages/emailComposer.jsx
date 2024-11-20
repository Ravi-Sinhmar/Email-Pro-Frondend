import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Image as ImageIcon, Table } from "lucide-react";

export default function Component({ sharedArray, sendEmailHandler }) {
  const scrollContainerRef = useRef(null);
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [sharedArray]);

  // sendEamil button onClick
  const sendEmail = () => {
    sendEmailHandler(subject, message, resume);
  };

  return (
    <Card className="md:col-span-2  bg-zinc-950 text-white  border-zinc-800 rounded-md pt-4 ">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="from" className="min-w-[3rem]">
              From
            </Label>
            <div className="flex items-center space-x-2 flex-1">
              <Input
                id="from"
                defaultValue="sender@gmail.com"
                className="bg-zinc-800 px-2 border-zinc-700"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 ">
            <Label htmlFor="to" className="min-w-[3rem]">
              To
            </Label>

            <div
              ref={scrollContainerRef}
              className="flex p-2 border rounded-md overflow-x-scroll space-x-2 scrollbar-hide min-w-14 min-h-9 w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sharedArray.map((email, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-zinc-700 px-2 py-1 rounded text-xs"
                >
                  {email}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-transparent border-zinc-700 text-lg font-semibold px-2"
        />

        <Textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ whiteSpace: "pre-wrap" }}
          className="min-h-[320px] bg-transparent border-zinc-800 resize-none focus-visible:ring-0 px-2"
        />
        <div className="flex justify-between">
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <Button
            onClick={sendEmail}
            className="bg-white text-zinc-800 hover:bg-white"
          >
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

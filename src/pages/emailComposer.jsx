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
  const [subject, setSubject] = useState("Subject");
  const [message, setMessage] = useState("Message");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [sharedArray]);
  
// sendEamil button onClick
  const sendEmail = () => {
    sendEmailHandler(subject,message,resume);
  };

  return (
    <Card className="md:col-span-2  bg-zinc-950 text-white  border-zinc-800 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg ">Compose Email</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="from" className="min-w-[3rem]">
              From
            </Label>
            <div className="flex items-center space-x-2 flex-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg" alt="Sender avatar" />
                <AvatarFallback className="text-black">JH</AvatarFallback>
              </Avatar>
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
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" alt="Recipient avatar" />
              <AvatarFallback className="text-black">MJ</AvatarFallback>
            </Avatar>

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
          style={{ whiteSpace: 'pre-wrap' }}
          className="min-h-[200px] bg-transparent border-zinc-800 resize-none focus-visible:ring-0 px-2"
        />

        <input type="file" onChange={(e) => setResume(e.target.files[0])}
         accept=".pdf,.doc,.docx"
         />  

        <div className="flex items-center space-x-4 pt-4 border-t border-zinc-800">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Sender profile" />
            <AvatarFallback className="text-black">JH</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">Julian Herbst</p>
            <p className="text-xs text-zinc-400">Design Consultant</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-zinc-800 py-4">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-black"
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-black"
          >
            <ImageIcon className="h-4 w-4" />
            <span className="sr-only">Attach image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-black"
          >
            <Table className="h-4 w-4" />
            <span className="sr-only">Insert table</span>
          </Button>
        </div>
        <Button onClick={sendEmail} className="bg-blue-600 hover:bg-blue-700">
          Send Email
        </Button>
      </CardFooter>
    </Card>
  );
}

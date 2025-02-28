import React from 'react';

export default function EmailAttachments({ attachments }) {
  return (
    <div className="mt-4">
      <h4 className="font-semibold text-zinc-200">Attachments:</h4>
      <div className="space-y-2">
        {attachments.map((attachment, index) => (
          <a
            key={index}
            href={`data:${attachment.mimeType};base64,${attachment.data}`}
            download={attachment.filename}
            className="text-blue-400 hover:underline"
          >
            {attachment.filename} ({(attachment.size / 1024).toFixed(2)} KB)
          </a>
        ))}
      </div>
    </div>
  );
}
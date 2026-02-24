'use client';

import { MessageCircle, Lightbulb, Heart, Zap } from 'lucide-react';

export function EmptyChatState() {
  

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 text-center">
      <div className="space-y-3">
        <div className="flex justify-center">
          <div className="rounded-full bg-accent/10 p-4">
            <MessageCircle className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Start a Conversation</h1>
        <p className="text-base text-muted-foreground">
          Pick a suggestion below or type your own message to get started
        </p>
      </div>

    </div>
  );
}

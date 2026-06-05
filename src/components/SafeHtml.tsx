import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
  allowedTags?: string[];
}

export function SafeHtml({ html, className, allowedTags }: SafeHtmlProps) {
  // Configure DOMPurify for maximum safety by default
  const defaultConfig = {
    ALLOWED_TAGS: allowedTags || ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
    KEEP_CONTENT: true,
    FORCE_BODY: false,
  };

  const sanitized = DOMPurify.sanitize(html, defaultConfig);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

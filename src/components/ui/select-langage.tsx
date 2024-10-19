import * as React from 'react'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../shadcn/select'
import { Language, languages } from '@/lib/language'
import { useEffect, useState } from 'react'

interface SelectLangageProps {
  languageDetect: string
  onLanguageChange: (language: string) => void
}

export function SelectLangage({ languageDetect, onLanguageChange }: SelectLangageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languageDetect);

  useEffect(() => {
    setSelectedLanguage(languageDetect);
  }, [languageDetect]);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    onLanguageChange(value);
  };

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[175px] h-7">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map((language: Language) => (
            <SelectItem key={language.name + "_" + language.extension} className="h-7" value={language.extension}>
              {language.extension}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

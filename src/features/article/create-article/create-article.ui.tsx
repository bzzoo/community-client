'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { useForm, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Badge } from '@/shared/ui/badge'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { CreateArticleSchema, CreateArticle } from './create-article.contracts'
import { QuillWrapper } from '@/shared/lib/quill'

export const CreateArticleForm = () => {
  const { handleSubmit, setValue, watch } = useForm<CreateArticle>({
    mode: 'onTouched',
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: { title: '', body: '', keywords: [], type: 'QUESTION' },
  })

  const formData = watch()
  const onSubmit = (data: CreateArticle) => {
    console.log(data)
  }
  const onError = (errors: any) => {
    console.error('Validation Errors:', errors);
  };

  return (
    <form
      className="flex flex-col items-center gap-8"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <ArticleArticleFormHeader />

      <div className="flex flex-col justify-center w-full">
        <div className="mb-20">
          <TitleInput setValue={setValue} title={formData.title} />
          <CreateArticleEditor setValue={setValue} watch={watch} />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 w-full">
        <SelectArticleType category={formData.type} setValue={setValue} />
        <AddArticleKeyword
          setValue={setValue}
          selectedKeywords={formData.keywords}
        />
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit">저장</Button>
      </div>
    </form>
  )
}

function TitleInput({
  setValue,
  title,
}: {
  setValue: UseFormSetValue<CreateArticle>
  title: string
}) {
  return (
    <Textarea
      className="w-full font-bold text-2xl line-clamp-3 outline-none flex-1 overflow-auto"
      placeholder="제목은 10자 이상 입력해주세요"
      value={title}
      onChange={(e) => setValue('title', e.target.value)}
    />
  )
}

function SelectArticleType({
  category,
  setValue,
}: {
  category: 'QUESTION' | 'SHARE'
  setValue: UseFormSetValue<CreateArticle>
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>카테고리</Label>
      <Select
        value={category}
        onValueChange={(value) =>
          setValue('type', value as 'QUESTION' | 'SHARE')
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="아티클 유형을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="QUESTION">질문</SelectItem>
          <SelectItem value="SHARE">공유</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function AddArticleKeyword({
  selectedKeywords,
  setValue,
}: {
  selectedKeywords: string[]
  setValue: UseFormSetValue<CreateArticle>
}) {
  const addKeyword = (keyword: string) => {
    if (keyword && !selectedKeywords.includes(keyword)) {
      setValue('keywords', [...selectedKeywords, keyword])
    }
  }

  const removeKeyword = (keyword: string) => {
    setValue(
      'keywords',
      selectedKeywords.filter((k) => k !== keyword),
    )
  }

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      addKeyword(e.currentTarget.value.trim())
      e.currentTarget.value = ''
      e.preventDefault()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>키워드</Label>
      <div className="relative">
        <Input
          type="text"
          placeholder="키워드를 입력하세요"
          onKeyDown={handleKeywordEnter}
        />
      </div>

      <ul className="flex flex-wrap gap-4 mt-2">
        {selectedKeywords.map((keyword) => (
          <Badge key={keyword} onClick={() => removeKeyword(keyword)}>
            {keyword}
          </Badge>
        ))}
      </ul>
    </div>
  )
}

function ArticleArticleFormHeader() {
  return (
    <div className="flex min-w-max w-full items-center border-b border-solid">
      <CreateArticleToolbar />
    </div>
  )
}

function CreateArticleToolbar() {
  return (
    <div
      id="toolbar"
      className="flex justify-center items-center gap-8 h-[56px] w-full"
    >
      <button className="ql-bold hover:bg-blue-500 " />
      <button className="ql-underline hover:bg-blue-500" />
      <button className="ql-blockquote hover:bg-blue-500" />
      <button className="ql-code-block hover:bg-blue-500" />
      <button className="ql-list  hover:bg-blue-500" value="ordered" />
      <button className="ql-list hover:bg-blue-500" value="bullet" />
      <button className="ql-image hover:bg-blue-500 hover:text-white" />
    </div>
  )
}

type CreateArticleEditorProps = {
  setValue: UseFormSetValue<CreateArticle>
  watch: UseFormWatch<CreateArticle>
}

export function CreateArticleEditor({
  setValue,
  watch,
}: CreateArticleEditorProps) {
  const content = watch('body')
  const modules = {
    toolbar: { container: '#toolbar' },
  }

  return (
    <QuillWrapper
      modules={modules}
      readOnly={false}
      placeholder="내용을 10자 이상 적어주세요"
      value={content}
      onChange={(content) => setValue('body', content)}
    />
  )
}

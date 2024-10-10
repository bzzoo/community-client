import { DynamicQuillWrapper } from './quill-wrapper'

export function ReadOnlyEditor({ content }: { content: string }) {
  return (
    <DynamicQuillWrapper
      modules={{ toolbar: false }}
      readOnly={true}
      placeholder=""
      value={content}
      onChange={() => {}}
    />
  )
}

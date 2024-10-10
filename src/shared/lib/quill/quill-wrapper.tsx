'use client'

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import dynamic from 'next/dynamic'
import 'quill/dist/quill.snow.css'

type QuillWrapperProps = {
  value: string
  onChange: (value: string) => void
  readOnly: boolean
  placeholder: string
  modules: any
}

export const DynamicQuillWrapper = dynamic(
  () => Promise.resolve(QuillWrapper),
  {
    ssr: false,
    loading: () => <div>...loading</div>,
  },
)

const QuillWrapper = forwardRef<any, QuillWrapperProps>(
  ({ value, onChange, readOnly, placeholder, modules }, ref) => {
    const quillRef = useRef<HTMLDivElement | null>(null)
    const quillInstance = useRef<any>(null)

    useImperativeHandle(ref, () => ({
      getQuillInstance: () => quillInstance.current,
    }))

    useEffect(() => {
      const loadQuill = async () => {
        if (typeof window !== 'undefined') {
          const Quill = (await import('quill')).default

          if (quillRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(quillRef.current, {
              theme: 'snow',
              readOnly: readOnly,
              placeholder: placeholder,
              modules: modules,
            })

            quillInstance.current.on('text-change', () => {
              const editorContent = quillInstance.current.root.innerHTML
              onChange(editorContent)
            })
          }

          if (quillInstance.current) {
            quillInstance.current.root.innerHTML = value
          }
        }
      }
      loadQuill()
    }, [])

    return <div ref={quillRef} />
  },
)

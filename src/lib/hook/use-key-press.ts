import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

type KeyHandler = (event: KeyboardEvent) => void

export const useKeyPress = (targetKey: string, callback: KeyHandler, modifiers: Array<'ctrlKey' | 'shiftKey' | 'altKey' | 'metaKey'> = [], node: HTMLElement | Document | null = null) => {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === targetKey.toLowerCase()) {
        const allModifiersPressed = modifiers.every((modifier) => event[modifier])
        if (modifiers.length === 0 || allModifiersPressed) {
          callbackRef.current(event)
        }
      }
    },
    [targetKey, modifiers]
  )

  useEffect(() => {
    const targetNode = node ?? document
    targetNode.addEventListener('keydown', handleKeyPress as EventListener)
    return () => targetNode.removeEventListener('keydown', handleKeyPress as EventListener)
  }, [handleKeyPress, node])
}

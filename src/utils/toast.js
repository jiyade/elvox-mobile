// toast.js
import { useToastStore } from "../stores"

let _hideTimer = null

function show(type, message, opts = {}) {
    const duration = typeof opts.duration === "number" ? opts.duration : 2000
    // set toast in store
    useToastStore.getState().setToast({
        id: Date.now(),
        type,
        message
    })

    // clear previous timer
    if (_hideTimer) clearTimeout(_hideTimer)
    _hideTimer = setTimeout(() => {
        useToastStore.getState().clearToast()
        _hideTimer = null
    }, duration)
}

const toast = {
    success: (message, opts) => show("success", message, opts),
    error: (message, opts) => show("error", message, opts),
    // optional: manually dismiss
    dismiss: () => {
        if (_hideTimer) clearTimeout(_hideTimer)
        useToastStore.getState().clearToast()
        _hideTimer = null
    }
}

export default toast

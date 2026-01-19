class NanoBridge {
    @JavascriptInterface
    fun onJsEvent(msg: String) {
        Log.d("NanoBridge", "JS event: $msg")
    }
}

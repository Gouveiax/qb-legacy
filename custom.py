# Slim Godot 4.7 web export template for QB Legacy (a 2D UI game): no 3D,
# physics, navigation, XR, networking or media codecs it never uses.
platform = "web"
target = "template_release"
threads = "no"
optimize = "size"
lto = "full"
deprecated = "yes"       # "no" makes start-up ~0.5 s slower (measured)
disable_3d = "yes"
disable_physics_2d = "yes"
disable_physics_3d = "yes"
disable_navigation_2d = "yes"
disable_navigation_3d = "yes"
disable_xr = "yes"
brotli = "yes"          # the built-in default font is WOFF2 (Brotli)
minizip = "no"
sdl = "no"
accesskit = "no"
javascript_eval = "yes"   # used to read the iPhone safe-area insets

# keep: gdscript, freetype, text_server_fb (Latin text), svg (default theme icons)
module_text_server_adv_enabled = "no"
module_text_server_fb_enabled = "yes"
for _m in ["astcenc", "basis_universal", "bcdec", "betsy", "bmp", "camera", "csg", "cvtt", "dds", "enet",
           "etcpak", "fbx", "glslang", "gltf", "godot_physics_2d", "godot_physics_3d", "gridmap", "hdr",
           "interactive_music", "jolt_physics", "jpg", "jsonrpc", "ktx", "lightmapper_rd", "mbedtls",
           "meshoptimizer", "mobile_vr", "mp3", "msdfgen", "multiplayer", "navigation_2d", "navigation_3d",
           "noise", "objectdb_profiler", "ogg", "openxr", "raycast", "regex", "theora", "tinyexr", "upnp",
           "vhacd", "visual_shader", "vorbis", "webp", "webrtc", "websocket", "webxr", "xatlas_unwrap", "zip"]:
    globals()["module_%s_enabled" % _m] = "no"

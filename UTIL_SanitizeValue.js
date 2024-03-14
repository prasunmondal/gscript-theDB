function util_sanitize_value(value) {
  if (value.startsWith("\"") && value.endsWith("\"")) {
    return value.substring(1, value.length - 1)
  }
  return value
}

function util_result_false() {
  return "[{\"result\":false}]";
}

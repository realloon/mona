const dateRegex = /-\d{4}-\d{2}-\d{2}\.md$/

export default function isDateFileNameValid(name) {
  // 校验格式 *-2023-06-18.md
  return dateRegex.test(name) ? true : false
}

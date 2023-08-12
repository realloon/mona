# mona 使用说明

通过 `{{ include "<var>include</var>" }}`，导入 HTML。

通过 `{{ var "<var>var</var>" }}`，使用 mona.config.js 中的变量。

通过 `{{ use content }}`，导入博文。

通过 `{{ use list }}`，导入博文列表。

另外，mona 会通过 `{{ use meta }}` 根据 mona.config.js 中的 `meta` 配置，生成相应的 `meta` 标签。

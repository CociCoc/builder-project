const { override, addLessLoader } = require('customize-cra');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = override(
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
        },
    }),
    (config) => {
        // Find the rule that contains oneOf (typically the rule for JS/CSS files)
        const oneOfRule = config.module.rules.find(rule => Array.isArray(rule.oneOf));

        if (oneOfRule) {
            // Modify the rule that includes 'postcss-loader'
            oneOfRule.oneOf.forEach((rule) => {
                if (rule.use) {
                    rule.use.forEach((loaderConfig) => {
                        if (loaderConfig.loader && loaderConfig.loader.includes('postcss-loader')) {
                            loaderConfig.options = {
                                postcssOptions: {
                                    plugins: [
                                        postcssPresetEnv({
                                            stage: 3,
                                            features: {
                                                'nesting-rules': true,
                                            },
                                        }),
                                    ],
                                },
                            };
                        }
                    });
                }
            });
        }

        return config;
    }
);

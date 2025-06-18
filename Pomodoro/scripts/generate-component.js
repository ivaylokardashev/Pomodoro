const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Моля, въведи име на компонент:");
  console.error("Пример: npm run generate TimerDisplay");
  process.exit(1);
}

const componentDir = path.resolve(__dirname, `../src/components/${componentName}`);

if (fs.existsSync(componentDir)) {
  console.error(`❌ Компонент с име '${componentName}' вече съществува.`);
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// 1. Създай Component.js файл
const componentCode = `import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const ${componentName} = () => {
  return (
    <View style={styles.container}>
      <Text>${componentName} компонент</Text>
    </View>
  );
};

export default ${componentName};
`;

fs.writeFileSync(
  `${componentDir}/${componentName}.js`,
  componentCode,
  "utf-8"
);

// 2. Създай styles.js файл
const stylesCode = `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
`;

fs.writeFileSync(`${componentDir}/styles.js`, stylesCode, "utf-8");

console.log(`✅ Създаден е компонентът '${componentName}' с styles.js`);

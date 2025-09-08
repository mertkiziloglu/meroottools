// JSON to Java POJO Generator
export const generateJavaPojo = (jsonString: string, className: string = "Root"): string => {
  try {
    const json = JSON.parse(jsonString);
    const classes = new Set<string>();
    
    const capitalizeFirst = (str: string): string => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    const sanitizePropertyName = (name: string): string => {
      // Java keywords ve özel karakterleri temizle
      const javaKeywords = ['class', 'public', 'private', 'protected', 'static', 'final', 'abstract', 'interface', 'extends', 'implements', 'package', 'import', 'new', 'this', 'super', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws'];
      let sanitized = name.replace(/[^a-zA-Z0-9_]/g, '_');
      if (javaKeywords.includes(sanitized.toLowerCase()) || /^\d/.test(sanitized)) {
        sanitized = '_' + sanitized;
      }
      return sanitized;
    };
    
    const getJavaType = (value: any, propertyName: string): string => {
      if (value === null) return "Object";
      
      const type = typeof value;
      switch (type) {
        case 'string': return 'String';
        case 'number': 
          return Number.isInteger(value) ? 'Integer' : 'Double';
        case 'boolean': return 'Boolean';
        case 'object':
          if (Array.isArray(value)) {
            if (value.length === 0) return 'List<Object>';
            const firstElementType = getJavaType(value[0], propertyName);
            return `List<${firstElementType}>`;
          } else {
            const nestedClassName = capitalizeFirst(sanitizePropertyName(propertyName));
            return nestedClassName;
          }
        default: return 'Object';
      }
    };
    
    const generateClassFromObject = (obj: any, className: string): string => {
      if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return '';
      }
      
      let classCode = `public class ${className} {\n`;
      const properties: string[] = [];
      const gettersSetters: string[] = [];
      
      // Properties ve nested classes
      Object.keys(obj).forEach(key => {
        const sanitizedKey = sanitizePropertyName(key);
        const value = obj[key];
        const javaType = getJavaType(value, sanitizedKey);
        
        // Private field
        properties.push(`    private ${javaType} ${sanitizedKey};`);
        
        // Getter
        const getterName = `get${capitalizeFirst(sanitizedKey)}`;
        gettersSetters.push(`    public ${javaType} ${getterName}() {\n        return ${sanitizedKey};\n    }`);
        
        // Setter
        const setterName = `set${capitalizeFirst(sanitizedKey)}`;
        gettersSetters.push(`    public void ${setterName}(${javaType} ${sanitizedKey}) {\n        this.${sanitizedKey} = ${sanitizedKey};\n    }`);
        
        // Nested class generation
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const nestedClassName = capitalizeFirst(sanitizedKey);
          if (!classes.has(nestedClassName)) {
            classes.add(nestedClassName);
            const nestedClass = generateClassFromObject(value, nestedClassName);
            if (nestedClass) {
              classCode = nestedClass + '\n\n' + classCode;
            }
          }
        } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
          const nestedClassName = capitalizeFirst(sanitizedKey.replace(/s$/, '')); // Remove 's' from plural
          if (!classes.has(nestedClassName)) {
            classes.add(nestedClassName);
            const nestedClass = generateClassFromObject(value[0], nestedClassName);
            if (nestedClass) {
              classCode = nestedClass + '\n\n' + classCode;
            }
          }
        }
      });
      
      // Add properties to class
      if (properties.length > 0) {
        classCode += '\n' + properties.join('\n') + '\n';
      }
      
      // Default constructor
      classCode += `\n    public ${className}() {\n    }\n`;
      
      // Add getters and setters
      if (gettersSetters.length > 0) {
        classCode += '\n' + gettersSetters.join('\n\n') + '\n';
      }
      
      classCode += '}\n';
      
      return classCode;
    };
    
    // Import statements
    let imports = '';
    const jsonStr = JSON.stringify(json);
    if (jsonStr.includes('[') || jsonStr.includes('List')) {
      imports += 'import java.util.List;\n';
    }
    if (jsonStr.includes('ArrayList') || jsonStr.includes('[')) {
      imports += 'import java.util.ArrayList;\n';
    }
    
    if (imports) {
      imports += '\n';
    }
    
    // Generate main class
    classes.add(className);
    const mainClass = generateClassFromObject(json, className);
    
    return imports + mainClass;
    
  } catch (error) {
    throw new Error(`Invalid JSON: ${error}`);
  }
};

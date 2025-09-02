import { autocompleteOptionsSchema } from "../schemas/models.js";

describe("autocompleteOptionsSchema", () => {
  test("should accept transform option", () => {
    const validConfig = {
      disable: false,
      transform: false,
      maxPromptTokens: 1024,
      debounceDelay: 100,
    };

    const result = autocompleteOptionsSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
    
    if (result.success) {
      expect(result.data.transform).toBe(false);
    }
  });

  test("should accept transform as true", () => {
    const validConfig = {
      transform: true,
    };

    const result = autocompleteOptionsSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
    
    if (result.success) {
      expect(result.data.transform).toBe(true);
    }
  });

  test("should accept config without transform option", () => {
    const validConfig = {
      disable: false,
      maxPromptTokens: 1024,
    };

    const result = autocompleteOptionsSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
    
    if (result.success) {
      expect(result.data.transform).toBeUndefined();
    }
  });

  test("should reject non-boolean transform values", () => {
    const invalidConfig = {
      transform: "false", // string instead of boolean
    };

    const result = autocompleteOptionsSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });
});
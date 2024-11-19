**Perdana Autocomplete** is a front-end library for creating input autocomplete functionality. It enables easy integration of an autocomplete feature with customizable options for various use cases.

## How to Use

### 1. Import the Script

To use Perdana Autocomplete, first include the JavaScript file in your HTML document.

```html
<script src="path/to/perdana-autocomplete.js"></script>
```

### 2. Create an Input with a Unique ID

Add an input field in your HTML file. Make sure to give it a unique `id`, as this will be required for initializing the autocomplete functionality.

```html
<input type="text" id="autocomplete-input" />
```

### 3. Initialize the Autocomplete

Now, initialize the autocomplete by calling the `PerdanaAutocomplete.init` function with the necessary properties. You can also include a button to control the autocomplete behavior.

```html
<script>
  PerdanaAutocomplete.init({
    id: 'autocomplete-input',  // The unique ID of the input field
    list: [                    // List of items to display as autocomplete suggestions
      { "id": 1, "name": "Alice" },
      { "id": 2, "name": "Bob" },
      { "id": 3, "name": "Charlie" }
    ],
    withButton: {              // Optional button configuration for controlling input
      id: 'autocomplete-btn',   // Button ID
      className: 'btn-class',   // Button class name
      text: 'Next',             // Button text content
      textColor: '#fff',        // Text color of the button
      backgroundColor: '#007bff', // Background color of the button
      iconAlt: 'Next button',   // Alt text for the button icon
      onClick: function(id, value) {  // Function to handle button clicks
        console.log(id, value);      // Logs the input field ID and value
      }
    }
  });
</script>
```

## PerdanaAutocomplete.init Properties

### `id` (string)

- **Description**: The `id` of the input element that this autocomplete is associated with.
- **Example**: `'autocomplete-input'`

### `list` (array)

- **Description**: An array of objects representing the autocomplete suggestions. Each object should contain `id` and `name` properties.
- **Example**:
  ```javascript
  [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Charlie" }
  ]
  ```

### `withButton` (optional, object)

- **Description**: If provided, a button will be added to control the autocomplete input field. You can configure the button’s appearance and behavior.
- **Properties**:
  - **id** (string): The ID of the button element.
  - **className** (string): The class name of the button.
  - **text** (string): The text displayed on the button.
  - **textColor** (string): CSS valid color for the button text.
  - **backgroundColor** (string): CSS valid color for the button background.
  - **iconAlt** (string): Alt text for the button icon (if used).
  - **onClick** (function): Callback function triggered when the button is clicked. This function receives the input field `id` and the current value of the input as arguments.

# Tools

A comprehensive data visualization and comparison tool that supports JSON, YAML, CSV, XML, and text files.

## Features

- **Data Visualizer**: Visualize JSON, YAML, CSV, and XML data as interactive graphs
- **Format Converter**: Convert between different data formats (JSON, YAML, XML, CSV)
- **Type Generator**: Generate TypeScript interfaces, Java classes, and other type definitions
- **File Diff Tool**: Compare text and JSON files with visual highlighting
- **Data Validation**: Validate JSON, YAML, and other data formats

## New: File Diff Tool

The diff tool allows you to:
- Compare two text or JSON files side-by-side
- Visualize differences with color-coded highlighting
- Switch between unified, side-by-side, and split view modes
- Automatically detect file types (JSON vs text)
- Deep analysis of JSON object differences
- Upload files via drag-and-drop or paste content directly

### Usage
1. Navigate to `/tools/diff` or click "Diff Tool" in the navigation
2. Upload files or paste content in the text editors
3. Choose your preferred view mode (side-by-side, unified, or split)
4. View the highlighted differences and analysis

## Development

### Setup

1. Go to the project folder

   ```sh
   cd tools
   ```

2. Install packages

   ```sh
   pnpm install
   ```

3. Run the project

   ```sh
   pnpm dev

   # Running on http://localhost:3000/
   ```

### Docker

🐳 A [`Dockerfile`](Dockerfile) is provided in the root of the repository.
If you want to run Tools locally:

```console
# Build a Docker image with:
docker compose build

# Run locally with `docker-compose`
docker compose up

# Go to http://localhost:8888
```

## Configuration

The supported node limit can be changed by editing the `NEXT_PUBLIC_NODE_LIMIT` value in the `.env` file at the project root.
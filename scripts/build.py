#!/usr/bin/env python3

import os
import subprocess

# Define the paths
install_dir = "../src/shared/lib/doc_parser"  # Directory for "yarn install"
build_dir = "."  # Directory for "yarn build" (current directory)
dist_dir = "../dist/shared/lib/doc_parser"  # Directory to create

# Create the nested directory (and parent directories if they don't exist)
try:
    os.makedirs(dist_dir, exist_ok=True)
    print(f"Directory '{dist_dir}' created successfully.")
except OSError as e:
    print(f"Failed to create directory '{dist_dir}': {e}")
    exit(1)

# # Run "yarn install" in the specified directory
# try:
#     print(f"Running 'yarn install' in '{install_dir}'...")
#     subprocess.run(["yarn", "install"], cwd=install_dir, check=True)
#     print("'yarn install' completed successfully.")
# except subprocess.CalledProcessError as e:
#     print(f"Failed to execute 'yarn install': {e}")
#     exit(1)
# except FileNotFoundError:
#     print("Error: 'yarn' command not found. Make sure Yarn is installed.")
#     exit(1)

# Run "yarn build" in the current directory
try:
    print("Running 'yarn build'...")
    subprocess.run(["yarn", "build"], cwd=build_dir, check=True)
    print("'yarn build' completed successfully.")
except subprocess.CalledProcessError as e:
    print(f"Failed to execute 'yarn build': {e}")
    exit(1)
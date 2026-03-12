# Tool Calling

How structured outputs let your agent read files, run commands, and act on the world.

## The Tool Calling Loop

The LLM tool calling loop is relatively straightforward. The model either decides to call one or more tools or respond with pure text. As long as we see functions being called, we should do another turn. If not, we can stop and return control to the user.

## Cleaning up the code

Now that we've manually run the logic above, let's extend our logic and create a function that represents a single turn for our agent.

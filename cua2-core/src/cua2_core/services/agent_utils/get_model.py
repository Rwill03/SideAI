import os
from smolagents import InferenceClientModel, Model
from smolagents.models import OpenAIModel

# Available model IDs
AVAILABLE_MODELS = [
    "gpt-4o",
    "gpt-4",
    "Qwen/Qwen3-VL-8B-Instruct",
    "Qwen/Qwen3-VL-30B-A3B-Instruct",
    "Qwen/Qwen3-VL-235B-A22B-Instruct",
]


def get_model(model_id: str) -> Model:
    """Get the model"""
    if model_id.startswith("gpt-"):
        # Use OpenAI
        return OpenAIModel(
            model_id=model_id,
            api_key=os.getenv("OPENAI_API_KEY"),
        )
    else:
        # Use HuggingFace Inference
        return InferenceClientModel(bill_to="smolagents", model_id=model_id)

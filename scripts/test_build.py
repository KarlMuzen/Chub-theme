import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import build

class BuildTests(unittest.TestCase):
    def test_source_sections(self):
        parts = build.split_source(build.SOURCE.read_text(encoding="utf-8"))
        self.assertTrue(parts["preset"].startswith("/* ===== PRESET"))
        self.assertIn("LITE — performance pass", parts["lite"])
        self.assertIn("YOUR OVERRIDES", parts["overrides"])

    def test_light_dark_parser(self):
        self.assertEqual(build.light_dark_to_dark("color:light-dark(red,color-mix(in srgb,blue,black));"), "color:color-mix(in srgb,blue,black);")

    def test_minifier_preserves_data_uri(self):
        css = 'a { background: url("data:image/svg+xml;utf8,<svg></svg>"); color: red; }'
        result = build.minify(css)
        self.assertIn("data:image/svg+xml;utf8", result)
        self.assertIn("color:red", result)

if __name__ == "__main__":
    unittest.main()

"""Independent mutation probes: demonstrate why behavioral grading needs edge cases."""
import unittest
from scope_mastery import make_counter, add_to_total

class ScopeMutationTests(unittest.TestCase):
    def test_zero_step_does_not_reset_state(self):
        counter = make_counter(7)
        self.assertEqual((counter(0), counter(2)), (7, 9))

    def test_function_instances_independent_even_after_interleaving(self):
        a, b = make_counter(10), make_counter(-1)
        self.assertEqual((a(1), b(2), a(-3), b(0)), (11, 1, 8, 1))

    def test_pure_updater_supports_negative_step(self):
        self.assertEqual(add_to_total(-8, -2), -10)

    def test_missing_nonlocal_variant_is_detected(self):
        def wrong_factory():
            count = 0
            def add(step):
                count = step
                return count
            return add
        wrong = wrong_factory()
        self.assertNotEqual([wrong(2), wrong(3)], [2, 5])

    def test_global_shared_state_variant_fails_independence(self):
        shared = [0]
        def wrong_factory():
            def add(step):
                shared[0] += step
                return shared[0]
            return add
        a, b = wrong_factory(), wrong_factory()
        self.assertNotEqual((a(2), b(4)), (2, 4))

if __name__ == "__main__":
    unittest.main()

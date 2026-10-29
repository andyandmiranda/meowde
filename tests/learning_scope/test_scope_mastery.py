"""Semantic regression examples for independently authored scope tasks."""
import unittest
from scope_mastery import make_counter, add_to_total

class ScopeMasteryTests(unittest.TestCase):
    def test_closure_accumulates(self):
        counter = make_counter()
        self.assertEqual([counter(2), counter(3)], [2, 5])

    def test_counters_do_not_share_state(self):
        first, second = make_counter(), make_counter()
        self.assertEqual(first(2), 2)
        self.assertEqual(second(4), 4)
        self.assertEqual(first(3), 5)

    def test_negative_step(self):
        self.assertEqual(make_counter(3)(-5), -2)

    def test_explicit_state_is_pure(self):
        previous = 10
        self.assertEqual(add_to_total(previous, 1), 11)
        self.assertEqual(previous, 10)

    def test_missing_nonlocal_causes_unboundlocal(self):
        def broken():
            value = 0
            def advance():
                value += 1
                return value
            return advance
        with self.assertRaises(UnboundLocalError):
            broken()()

    def test_local_assignment_shadows_outer_name(self):
        total = 1
        def broken():
            total = total + 1
            return total
        with self.assertRaises(UnboundLocalError):
            broken()
        self.assertEqual(total, 1)

if __name__ == "__main__":
    unittest.main()

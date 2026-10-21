"""Independent scope exercise prototype; NOT wired into the learner app."""

def make_counter(start=0):
    count = start
    def advance(step):
        nonlocal count
        count += step
        return count
    return advance

def add_to_total(total, step):
    """Prefer explicit state passing if hidden shared state is not needed."""
    return total + step

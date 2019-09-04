from django_extensions.management.jobs import BaseJob, MinutelyJob
from core.models import User

class ReputationThisWeekReset(MinutelyJob):
    help = "Resets reputation_this_week field for each user"

    def execute(self):
        # executing empty sample job
        print("Executing")
        users = User.objects.all()
        for user in users:
            user.reputation_this_week = 0
            user.save()
            print("Done")

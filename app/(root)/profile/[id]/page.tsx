import { getTopInteractedTags } from "@/actions/tag.action";
import { getUserInfo } from "@/actions/user.action";
import NoResults from "@/components/shared/NoResults";
import RenderTag from "@/components/shared/RenderTag";
import { Button } from "@/components/ui/button";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab";

const Profile = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  if (!userInfo)
    return (
      <NoResults
        title="User is not exists"
        description="User details are not exists on our records"
      />
    );

  const { user, totalAnswers, totalQuestions }: any = userInfo;
  const { picture, email, name, username, joinedOn } = user;
  const tags = await getTopInteractedTags({ userId: clerkId! });

  return (
    <section className="w-full">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <Image
          src={picture}
          width={140}
          height={140}
          alt="Profile Pic"
          className="rounded-full"
        />
        <div className="my-3 flex flex-1 flex-col justify-between gap-2">
          <div className="flex-between flex-col gap-4 md:flex-row">
            <div>
              <h1 className="h1-bold text-dark100_light900 tracking-normal">
                {name}
              </h1>
              <Link href="/profile" className="text-dark200_light800">
                @{username}
              </Link>
            </div>
            <div>
              <SignedIn>
                {clerkId === user.clerkId && (
                  <Link href={`/profile/edit`}>
                    <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                      Edit Profile
                    </Button>
                  </Link>
                )}
              </SignedIn>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-start gap-6 md:mt-2 xl:flex-row">
            {user.portfolioLink && (
              <ProfileLink
                imgUrl="/assets/icons/link.svg"
                href={user.portfolioLink}
                title="Portfolio"
              />
            )}
            {email && (
              <ProfileLink
                imgUrl="/assets/icons/link.svg"
                href={`mailto:${email}`}
                title={email}
              />
            )}

            {user.location && (
              <ProfileLink
                imgUrl="/assets/icons/locations.svg"
                title={user.location}
              />
            )}

            <ProfileLink
              imgUrl="/assets/icons/calendar.svg"
              title={getJoinedDate(joinedOn)}
            />
          </div>
          {user.bio && (
            <p className="paragraph-regular text-dark400_light800 mt-8">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <p className="paragraph-regular text-dark400_light800 mt-[10px] xl:ml-40">
        Launch your development career with project-based coaching - showcase
        your skills with practical development experience and land the coding
        career of your dreams. Check out jsmastery.pro
      </p>

      <Stats totalAnswers={totalAnswers} totalQuestions={totalQuestions} />

      <div className="mt-10 flex flex-col justify-between gap-4 md:flex-row">
        <div className="md:w-10/12">
          <div className="flex gap-10">
            <Tabs defaultValue="top-posts" className="flex-1">
              <TabsList className="background-light800_dark400 mb-6 min-h-[42px] p-0">
                <TabsTrigger
                  value="top-posts"
                  className="tab px-6 text-base font-bold"
                >
                  Top Posts
                </TabsTrigger>
                <TabsTrigger
                  value="answers"
                  className="tab px-6 text-base font-bold"
                >
                  Answers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="top-posts" className="flex flex-col gap-4">
                <QuestionTab
                  searchParams={searchParams}
                  searchProps={searchParams.toString()}
                  userId={user._id}
                  clerkId={clerkId}
                />
              </TabsContent>
              <TabsContent value="answers" className="flex flex-col gap-4">
                <AnswerTab
                  searchParams={searchParams}
                  searchProps={searchParams.toString()}
                  userId={user._id}
                  clerkId={clerkId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <h3 className="h3-bold text-dark200_light900 mb-5">Top Tags</h3>
          <div className="flex flex-col gap-4">
            {tags?.map((tag) => {
              return (
                <RenderTag
                  key={JSON.stringify(tag._id)}
                  _id={JSON.stringify(tag._id)}
                  name={tag.name}
                  totalQuestions={tag.totalQuestions}
                  showCount={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

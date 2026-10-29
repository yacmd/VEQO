import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

type Role = 'client' | 'creator';
type Tab = 'home' | 'discover' | 'projects' | 'messages' | 'profile';
type Screen =
  | 'onboarding'
  | 'role'
  | 'auth'
  | 'app'
  | 'creator'
  | 'project'
  | 'newProject'
  | 'notifications';

type Creator = {
  id: string;
  name: string;
  title: string;
  country: string;
  rating: string;
  jobs: number;
  price: number;
  availability: string;
  initials: string;
  accent: string;
  specialties: string[];
  verified: boolean;
};

const colors = {
  lightBg: '#F6F5F2',
  darkBg: '#0B0B0D',
  lightSurface: '#FFFFFF',
  darkSurface: '#151518',
  lightText: '#111113',
  darkText: '#F5F5F5',
  lightMuted: '#707178',
  darkMuted: '#A1A1A8',
  line: '#E8E7E2',
  darkLine: '#2B2B30',
  blue: '#2F7BFF',
  blueSoft: '#EAF1FF',
  green: '#21B07A',
  amber: '#D79B2B',
};

const creators: Creator[] = [
  {
    id: '1',
    name: 'Adam Benali',
    title: 'Motion Designer',
    country: 'Morocco',
    rating: '4.9',
    jobs: 38,
    price: 45,
    availability: 'Available this week',
    initials: 'AB',
    accent: '#6D8CFF',
    specialties: ['Motion Graphics', 'Reels', '3D'],
    verified: true,
  },
  {
    id: '2',
    name: 'Mia Santos',
    title: 'Video Editor',
    country: 'Portugal',
    rating: '5.0',
    jobs: 62,
    price: 60,
    availability: 'Available today',
    initials: 'MS',
    accent: '#D978A9',
    specialties: ['YouTube', 'Ads', 'Short-form'],
    verified: true,
  },
  {
    id: '3',
    name: 'Leo Martin',
    title: 'Brand Designer',
    country: 'France',
    rating: '4.8',
    jobs: 29,
    price: 35,
    availability: '2–3 day delivery',
    initials: 'LM',
    accent: '#E79A61',
    specialties: ['Branding', 'Social', 'Editorial'],
    verified: false,
  },
  {
    id: '4',
    name: 'Noah Kim',
    title: 'Audio Engineer',
    country: 'South Korea',
    rating: '4.9',
    jobs: 44,
    price: 50,
    availability: 'Available this week',
    initials: 'NK',
    accent: '#5DB7A9',
    specialties: ['Sound Design', 'Mixing', 'Podcast'],
    verified: true,
  },
];

const categories = [
  { label: 'Video Editing', icon: 'videocam-outline' as const },
  { label: 'Motion Design', icon: 'sparkles-outline' as const },
  { label: 'Graphic Design', icon: 'color-palette-outline' as const },
  { label: '3D & VFX', icon: 'cube-outline' as const },
  { label: 'Audio', icon: 'musical-notes-outline' as const },
  { label: 'Photography', icon: 'camera-outline' as const },
];

function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [role, setRole] = useState<Role>('client');
  const [tab, setTab] = useState<Tab>('home');
  const [selectedCreator, setSelectedCreator] = useState<Creator>(creators[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [search, setSearch] = useState('');
  const [projectStep, setProjectStep] = useState(0);

  const dark = theme === 'dark';
  const c = dark
    ? {
        bg: colors.darkBg,
        surface: colors.darkSurface,
        text: colors.darkText,
        muted: colors.darkMuted,
        line: colors.darkLine,
      }
    : {
        bg: colors.lightBg,
        surface: colors.lightSurface,
        text: colors.lightText,
        muted: colors.lightMuted,
        line: colors.line,
      };

  const filteredCreators = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return creators;
    return creators.filter(
      (x) =>
        x.name.toLowerCase().includes(query) ||
        x.title.toLowerCase().includes(query) ||
        x.specialties.some((s) => s.toLowerCase().includes(query)),
    );
  }, [search]);

  const goApp = (nextRole: Role) => {
    setRole(nextRole);
    setTab('home');
    setScreen('app');
  };

  if (screen === 'onboarding') {
    return (
      <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
        <View style={styles.splash}>
          <View style={styles.logoSquare}>
            <View style={styles.logoVLeft} />
            <View style={styles.logoVRight} />
          </View>
          <Text style={[styles.wordmark, { color: c.text }]}>VEQO</Text>
          <Text style={[styles.tagline, { color: c.muted }]}>The creative marketplace.</Text>
          <Pressable style={styles.primaryButton} onPress={() => setScreen('role')}>
            <Text style={styles.primaryButtonText}>Continue</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </Shell>
    );
  }

  if (screen === 'role') {
    return (
      <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
        <ScrollView contentContainerStyle={styles.onboardingContainer}>
          <TopBack onPress={() => setScreen('onboarding')} color={c.text} />
          <Eyebrow text="WELCOME TO VEQO" color={c.muted} />
          <Text style={[styles.heroTitle, { color: c.text }]}>What brings you here?</Text>
          <Text style={[styles.heroBody, { color: c.muted }]}>
            One place to discover trusted creative talent — or build your professional reputation.
          </Text>

          <RoleCard
            icon="search-outline"
            title="I’m looking for a creative"
            body="Find editors, designers, motion artists, audio professionals and more."
            onPress={() => {
              setRole('client');
              setScreen('auth');
            }}
            active={!dark}
            c={c}
          />
          <RoleCard
            icon="sparkles-outline"
            title="I’m a creative professional"
            body="Build your portfolio, collect verified work and find serious clients."
            onPress={() => {
              setRole('creator');
              setScreen('auth');
            }}
            active={false}
            c={c}
          />
        </ScrollView>
      </Shell>
    );
  }

  if (screen === 'auth') {
    return (
      <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.onboardingContainer}>
            <TopBack onPress={() => setScreen('role')} color={c.text} />
            <Eyebrow text="CREATE YOUR ACCOUNT" color={c.muted} />
            <Text style={[styles.heroTitle, { color: c.text }]}>
              {role === 'client' ? 'Let’s find your next creative.' : 'Build your creative identity.'}
            </Text>
            <Text style={[styles.heroBody, { color: c.muted }]}>
              This first version uses local demo authentication so you can explore the product immediately.
            </Text>

            <Text style={[styles.inputLabel, { color: c.text }]}>Email</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={c.muted}
              style={[styles.input, { backgroundColor: c.surface, borderColor: c.line, color: c.text }]}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={[styles.inputLabel, { color: c.text }]}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={c.muted}
              style={[styles.input, { backgroundColor: c.surface, borderColor: c.line, color: c.text }]}
              secureTextEntry
            />

            <Pressable style={styles.primaryButton} onPress={() => goApp(role)}>
              <Text style={styles.primaryButtonText}>Enter VEQO</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>

            <View style={styles.smallNote}>
              <Ionicons name="lock-closed-outline" size={15} color={c.muted} />
              <Text style={[styles.smallNoteText, { color: c.muted }]}>Your account data stays inside your VEQO workspace.</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Shell>
    );
  }

  if (screen === 'creator') {
    return (
      <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
        <ScrollView contentContainerStyle={styles.pagePad}>
          <TopBack onPress={() => setScreen('app')} color={c.text} />
          <View style={styles.profileHero}>
            <View style={[styles.bigAvatar, { backgroundColor: selectedCreator.accent }]}>
              <Text style={styles.bigAvatarText}>{selectedCreator.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.rowInline}>
                <Text style={[styles.profileName, { color: c.text }]}>{selectedCreator.name}</Text>
                {selectedCreator.verified && <Ionicons name="checkmark-circle" size={18} color={colors.blue} />}
              </View>
              <Text style={[styles.profileTitle, { color: c.muted }]}>{selectedCreator.title}</Text>
              <Text style={[styles.profileMeta, { color: c.muted }]}>
                {selectedCreator.country}  •  ★ {selectedCreator.rating}  •  {selectedCreator.jobs} projects
              </Text>
            </View>
          </View>

          <View style={styles.statRow}>
            <Stat label="Rating" value={selectedCreator.rating} c={c} />
            <Stat label="Verified work" value={String(selectedCreator.jobs)} c={c} />
            <Stat label="From" value={`$${selectedCreator.price}`} c={c} />
          </View>

          <SectionTitle title="About" color={c.text} />
          <Text style={[styles.bodyText, { color: c.muted }]}>
            Senior creative focused on polished, social-first visuals with a strong eye for pacing, motion and brand consistency.
          </Text>

          <SectionTitle title="Specialties" color={c.text} />
          <View style={styles.chipWrap}>
            {selectedCreator.specialties.map((item) => (
              <View key={item} style={[styles.chip, { backgroundColor: dark ? '#202027' : '#ECEBF0' }]}>
                <Text style={[styles.chipText, { color: c.text }]}>{item}</Text>
              </View>
            ))}
          </View>

          <SectionTitle title="Selected work" color={c.text} />
          <View style={styles.workGrid}>
            {['AE', 'UI', '3D', 'ADS'].map((tag, i) => (
              <WorkCard key={tag} tag={tag} accent={i % 2 === 0 ? colors.blue : '#A88BFF'} c={c} />
            ))}
          </View>

          <SectionTitle title="VEQO reputation" color={c.text} />
          <View style={[styles.reputationCard, { backgroundColor: c.surface, borderColor: c.line }]}>
            <ReputationRow label="Completed projects" value={`${selectedCreator.jobs}`} c={c} />
            <ReputationRow label="Response" value="< 30 min" c={c} />
            <ReputationRow label="Availability" value={selectedCreator.availability} c={c} />
          </View>

          <View style={styles.bottomActionRow}>
            <Pressable
              style={[styles.secondaryButton, { backgroundColor: c.surface, borderColor: c.line }]}
              onPress={() => Alert.alert('VEQO', 'Messaging will be connected to Supabase in the next phase.')}
            >
              <Ionicons name="chatbubble-outline" size={18} color={c.text} />
              <Text style={[styles.secondaryButtonText, { color: c.text }]}>Message</Text>
            </Pressable>
            <Pressable style={[styles.primaryButton, { flex: 1 }]} onPress={() => setScreen('newProject')}>
              <Text style={styles.primaryButtonText}>Hire</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Shell>
    );
  }

  if (screen === 'newProject') {
    const steps = ['Brief', 'Category', 'Budget', 'Review'];
    const titles = ['What are you creating?', 'What kind of creative do you need?', 'Set a budget.', 'Ready to publish?'];
    return (
      <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
        <ScrollView contentContainerStyle={styles.pagePad}>
          <TopBack onPress={() => setScreen('app')} color={c.text} />
          <Eyebrow text={`STEP ${projectStep + 1} OF ${steps.length}`} color={c.muted} />
          <Text style={[styles.heroTitleSmall, { color: c.text }]}>{titles[projectStep]}</Text>
          <View style={styles.progressTrack}>
            {steps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressSegment,
                  { backgroundColor: index <= projectStep ? colors.blue : c.line },
                ]}
              />
            ))}
          </View>

          {projectStep === 0 && (
            <>
              <Text style={[styles.inputLabel, { color: c.text }]}>Project title</Text>
              <TextInput
                placeholder="e.g. 30s launch Reel for my brand"
                placeholderTextColor={c.muted}
                style={[styles.input, { backgroundColor: c.surface, borderColor: c.line, color: c.text }]}
              />
              <Text style={[styles.inputLabel, { color: c.text }]}>Brief</Text>
              <TextInput
                placeholder="Describe the outcome you want..."
                placeholderTextColor={c.muted}
                style={[styles.input, styles.textArea, { backgroundColor: c.surface, borderColor: c.line, color: c.text }]}
                multiline
              />
            </>
          )}

          {projectStep === 1 && (
            <View style={styles.optionList}>
              {categories.slice(0, 5).map((item) => (
                <Pressable key={item.label} style={[styles.optionRow, { backgroundColor: c.surface, borderColor: c.line }]}>
                  <Ionicons name={item.icon} size={22} color={colors.blue} />
                  <Text style={[styles.optionRowText, { color: c.text }]}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={c.muted} />
                </Pressable>
              ))}
            </View>
          )}

          {projectStep === 2 && (
            <>
              <Text style={[styles.bodyText, { color: c.muted }]}>
                Choose the range you are comfortable with. Exact price can be agreed with the selected creator.
              </Text>
              <View style={styles.budgetGrid}>
                {['$25–50', '$50–100', '$100–250', '$250+'].map((item) => (
                  <Pressable key={item} style={[styles.budgetCard, { backgroundColor: c.surface, borderColor: c.line }]}>
                    <Text style={[styles.budgetText, { color: c.text }]}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {projectStep === 3 && (
            <View style={[styles.reputationCard, { backgroundColor: c.surface, borderColor: c.line }]}>
              <ReputationRow label="Project" value="Launch Reel" c={c} />
              <ReputationRow label="Category" value="Video Editing" c={c} />
              <ReputationRow label="Budget" value="$50–100" c={c} />
              <ReputationRow label="Status" value="Ready to publish" c={c} />
            </View>
          )}

          <View style={styles.stepActions}>
            {projectStep > 0 && (
              <Pressable
                style={[styles.secondaryButton, { flex: 1, backgroundColor: c.surface, borderColor: c.line }]}
                onPress={() => setProjectStep((x) => x - 1)}
              >
                <Text style={[styles.secondaryButtonText, { color: c.text }]}>Back</Text>
              </Pressable>
            )}
            <Pressable
              style={[styles.primaryButton, { flex: 1 }]}
              onPress={() => {
                if (projectStep < 3) setProjectStep((x) => x + 1);
                else {
                  setProjectStep(0);
                  setScreen('app');
                  Alert.alert('Project ready', 'Your project draft is ready in VEQO.');
                }
              }}
            >
              <Text style={styles.primaryButtonText}>{projectStep < 3 ? 'Continue' : 'Publish draft'}</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </ScrollView>
      </Shell>
    );
  }

  if (screen === 'notifications') {
    const notices = [
      ['New project match', 'A new Motion Design project matches your skills.', '2m'],
      ['Application viewed', 'Your proposal for “Brand launch Reel” was viewed.', '38m'],
      ['VEQO verified work', 'Your latest completed project is now visible on your profile.', '1h'],
    ];
    return (
      <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
        <ScrollView contentContainerStyle={styles.pagePad}>
          <TopBack onPress={() => setScreen('app')} color={c.text} />
          <Text style={[styles.heroTitleSmall, { color: c.text }]}>Notifications</Text>
          {notices.map(([title, body, time]) => (
            <View key={title} style={[styles.notificationCard, { backgroundColor: c.surface, borderColor: c.line }]}>
              <View style={styles.notificationDot} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.notificationTitle, { color: c.text }]}>{title}</Text>
                <Text style={[styles.bodyText, { color: c.muted }]}>{body}</Text>
              </View>
              <Text style={[styles.timeText, { color: c.muted }]}>{time}</Text>
            </View>
          ))}
        </ScrollView>
      </Shell>
    );
  }

  return (
    <Shell bg={c.bg} status={dark ? 'light' : 'dark'}>
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <View>
            <Text style={[styles.topBrand, { color: c.text }]}>VEQO</Text>
            <Text style={[styles.topMeta, { color: c.muted }]}>
              {role === 'client' ? 'Creative marketplace' : 'Creator workspace'}
            </Text>
          </View>
          <View style={styles.topActions}>
            <Pressable
              onPress={() => setScreen('notifications')}
              style={[styles.iconButton, { backgroundColor: c.surface, borderColor: c.line }]}
            >
              <Ionicons name="notifications-outline" size={20} color={c.text} />
              <View style={styles.notificationBadge} />
            </Pressable>
            <Pressable
              onPress={() => setTheme(dark ? 'light' : 'dark')}
              style={[styles.iconButton, { backgroundColor: c.surface, borderColor: c.line }]}
            >
              <Ionicons name={dark ? 'sunny-outline' : 'moon-outline'} size={19} color={c.text} />
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {tab === 'home' && (
            <Home
              role={role}
              c={c}
              onNewProject={() => setScreen('newProject')}
              onDiscover={() => setTab('discover')}
              onCreator={(creator) => {
                setSelectedCreator(creator);
                setScreen('creator');
              }}
            />
          )}
          {tab === 'discover' && (
            <Discover
              c={c}
              search={search}
              setSearch={setSearch}
              creators={filteredCreators}
              onCreator={(creator) => {
                setSelectedCreator(creator);
                setScreen('creator');
              }}
            />
          )}
          {tab === 'projects' && <Projects c={c} role={role} />}
          {tab === 'messages' && <Messages c={c} />}
          {tab === 'profile' && (
            <Profile c={c} role={role} onRoleChange={setRole} />
          )}
        </View>

        <BottomTabs tab={tab} setTab={setTab} c={c} />
      </View>
    </Shell>
  );
}

function Shell({ children, bg, status }: { children: React.ReactNode; bg: string; status: 'light' | 'dark' }) {
  return (
    <>
      <StatusBar style={status} />
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>{children}</SafeAreaView>
    </>
  );
}

function Home({
  role,
  c,
  onNewProject,
  onDiscover,
  onCreator,
}: {
  role: Role;
  c: any;
  onNewProject: () => void;
  onDiscover: () => void;
  onCreator: (creator: Creator) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.pagePad}>
      <View style={[styles.heroCard, { backgroundColor: c.surface, borderColor: c.line }]}>
        <View style={styles.heroTop}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.heroEyebrow, { color: colors.blue }]}>
              {role === 'client' ? 'CREATE WITH CONFIDENCE' : 'BUILD YOUR REPUTATION'}
            </Text>
            <Text style={[styles.heroCardTitle, { color: c.text }]}>
              {role === 'client'
                ? 'Your next creative project starts here.'
                : 'Turn great work into a stronger professional identity.'}
            </Text>
            <Text style={[styles.bodyText, { color: c.muted }]}>
              {role === 'client'
                ? 'Discover trusted editors, designers, motion artists and audio professionals.'
                : 'Showcase your work, collect verified projects and connect with serious clients.'}
            </Text>
          </View>
        </View>
        <Pressable style={styles.primaryButton} onPress={role === 'client' ? onNewProject : onDiscover}>
          <Text style={styles.primaryButtonText}>{role === 'client' ? 'Create project' : 'Discover opportunities'}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>

      <SectionTitle title={role === 'client' ? 'Explore creative talent' : 'Find your next project'} color={c.text} />
      <View style={styles.categoryGrid}>
        {categories.map((item) => (
          <Pressable key={item.label} style={[styles.categoryCard, { backgroundColor: c.surface, borderColor: c.line }]} onPress={onDiscover}>
            <Ionicons name={item.icon} size={22} color={colors.blue} />
            <Text style={[styles.categoryText, { color: c.text }]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle title="Featured creators" color={c.text} />
      {creators.slice(0, 3).map((creator) => (
        <Pressable key={creator.id} onPress={() => onCreator(creator)}>
          <CreatorCard creator={creator} c={c} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

function Discover({
  c,
  search,
  setSearch,
  creators,
  onCreator,
}: {
  c: any;
  search: string;
  setSearch: (value: string) => void;
  creators: Creator[];
  onCreator: (creator: Creator) => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.pagePad}>
        <Text style={[styles.pageTitle, { color: c.text }]}>Discover</Text>
        <Text style={[styles.bodyText, { color: c.muted }]}>Find the right creative for the work that matters.</Text>
        <View style={[styles.searchBar, { backgroundColor: c.surface, borderColor: c.line }]}>
          <Ionicons name="search-outline" size={20} color={c.muted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search editors, designers, motion..."
            placeholderTextColor={c.muted}
            style={[styles.searchInput, { color: c.text }]}
          />
          <Ionicons name="options-outline" size={19} color={c.muted} />
        </View>

        <View style={styles.filterRow}>
          {['Video', 'Motion', 'Design', 'Audio'].map((label, index) => (
            <View key={label} style={[styles.filterPill, index === 0 && { backgroundColor: colors.blueSoft }]}>
              <Text style={[styles.filterPillText, index === 0 ? { color: colors.blue } : { color: c.muted }]}>{label}</Text>
            </View>
          ))}
        </View>

        {creators.map((creator) => (
          <Pressable key={creator.id} onPress={() => onCreator(creator)}>
            <CreatorCard creator={creator} c={c} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function Projects({ c, role }: { c: any; role: Role }) {
  const projectItems = role === 'client'
    ? [
        ['Launch Reel', 'Video Editing', 'In progress', '$80'],
        ['Brand Identity', 'Graphic Design', 'Reviewing', '$220'],
      ]
    : [
        ['Product Story', 'Motion Design', 'In progress', '$120'],
        ['Creator Intro', 'Video Editing', 'Preview submitted', '$75'],
      ];

  return (
    <ScrollView contentContainerStyle={styles.pagePad}>
      <Text style={[styles.pageTitle, { color: c.text }]}>Projects</Text>
      <Text style={[styles.bodyText, { color: c.muted }]}>
        Everything related to your work, in one place.
      </Text>
      {projectItems.map(([title, category, status, budget]) => (
        <View key={title} style={[styles.projectCard, { backgroundColor: c.surface, borderColor: c.line }]}>
          <View style={styles.projectTop}>
            <View style={[styles.projectIcon, { backgroundColor: colors.blueSoft }]}>
              <Ionicons name="layers-outline" size={21} color={colors.blue} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.projectTitle, { color: c.text }]}>{title}</Text>
              <Text style={[styles.projectMeta, { color: c.muted }]}>{category}</Text>
            </View>
            <Text style={[styles.projectBudget, { color: c.text }]}>{budget}</Text>
          </View>
          <View style={styles.statusLine}>
            <View style={styles.statusDot} />
            <Text style={[styles.statusText, { color: c.muted }]}>{status}</Text>
            <Ionicons name="chevron-forward" size={17} color={c.muted} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Messages({ c }: { c: any }) {
  const rows = [
    ['Adam Benali', 'The preview is ready for review.', '2m', '#6D8CFF'],
    ['Mia Santos', 'I can deliver by Thursday.', '1h', '#D978A9'],
    ['VEQO', 'Your verified work is now visible.', '3h', colors.blue],
  ];
  return (
    <ScrollView contentContainerStyle={styles.pagePad}>
      <Text style={[styles.pageTitle, { color: c.text }]}>Messages</Text>
      <Text style={[styles.bodyText, { color: c.muted }]}>Project conversations stay organized around the work.</Text>
      {rows.map(([name, message, time, accent]) => (
        <Pressable key={name} style={[styles.messageRow, { backgroundColor: c.surface, borderColor: c.line }]}>
          <View style={[styles.avatar, { backgroundColor: accent }]}>
            <Text style={styles.avatarText}>{name === 'VEQO' ? 'V' : name.slice(0, 2).toUpperCase()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.rowInline}>
              <Text style={[styles.messageName, { color: c.text }]}>{name}</Text>
              <Text style={[styles.timeText, { color: c.muted }]}>{time}</Text>
            </View>
            <Text style={[styles.bodyText, { color: c.muted }]} numberOfLines={1}>{message}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function Profile({ c, role, onRoleChange }: { c: any; role: Role; onRoleChange: (role: Role) => void }) {
  return (
    <ScrollView contentContainerStyle={styles.pagePad}>
      <View style={styles.profileHero}>
        <View style={[styles.bigAvatar, { backgroundColor: colors.blue }]}>
          <Text style={styles.bigAvatarText}>YA</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.profileName, { color: c.text }]}>YACMD</Text>
          <Text style={[styles.profileTitle, { color: c.muted }]}>
            {role === 'creator' ? 'Creator account' : 'Client account'}
          </Text>
          <Text style={[styles.profileMeta, { color: c.muted }]}>VEQO member</Text>
        </View>
      </View>

      <SectionTitle title="Account" color={c.text} />
      <View style={[styles.reputationCard, { backgroundColor: c.surface, borderColor: c.line }]}>
        <ReputationRow label="Current mode" value={role === 'creator' ? 'Creative professional' : 'Client'} c={c} />
        <ReputationRow label="Projects" value="2 active" c={c} />
        <ReputationRow label="Verification" value="Ready for next phase" c={c} />
      </View>

      <SectionTitle title="Switch experience" color={c.text} />
      <View style={styles.switchRow}>
        <Pressable
          style={[styles.roleSwitch, role === 'client' && { backgroundColor: colors.blue }]}
          onPress={() => onRoleChange('client')}
        >
          <Text style={[styles.roleSwitchText, { color: role === 'client' ? '#FFF' : c.muted }]}>Client</Text>
        </Pressable>
        <Pressable
          style={[styles.roleSwitch, role === 'creator' && { backgroundColor: colors.blue }]}
          onPress={() => onRoleChange('creator')}
        >
          <Text style={[styles.roleSwitchText, { color: role === 'creator' ? '#FFF' : c.muted }]}>Creator</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function BottomTabs({ tab, setTab, c }: { tab: Tab; setTab: (tab: Tab) => void; c: any }) {
  const items: { key: Tab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'home', label: 'Home', icon: 'home-outline' },
    { key: 'discover', label: 'Discover', icon: 'search-outline' },
    { key: 'projects', label: 'Projects', icon: 'layers-outline' },
    { key: 'messages', label: 'Messages', icon: 'chatbubble-ellipses-outline' },
    { key: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  return (
    <View style={[styles.bottomTabs, { backgroundColor: c.surface, borderColor: c.line }]}>
      {items.map((item) => {
        const active = item.key === tab;
        return (
          <Pressable key={item.key} style={styles.bottomTab} onPress={() => setTab(item.key)}>
            <Ionicons name={item.icon} size={21} color={active ? colors.blue : c.muted} />
            <Text style={[styles.bottomLabel, { color: active ? colors.blue : c.muted }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function CreatorCard({ creator, c }: { creator: Creator; c: any }) {
  return (
    <View style={[styles.creatorCard, { backgroundColor: c.surface, borderColor: c.line }]}>
      <View style={styles.creatorTop}>
        <View style={[styles.avatar, { backgroundColor: creator.accent }]}>
          <Text style={styles.avatarText}>{creator.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.rowInline}>
            <Text style={[styles.creatorName, { color: c.text }]}>{creator.name}</Text>
            {creator.verified && <Ionicons name="checkmark-circle" size={16} color={colors.blue} />}
          </View>
          <Text style={[styles.creatorTitle, { color: c.muted }]}>{creator.title}</Text>
          <Text style={[styles.creatorMeta, { color: c.muted }]}>
            ★ {creator.rating}  •  {creator.jobs} projects  •  From ${creator.price}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={c.muted} />
      </View>
      <View style={styles.chipWrap}>
        {creator.specialties.map((item) => (
          <View key={item} style={[styles.miniChip, { backgroundColor: darkenChip(c) }]}>
            <Text style={[styles.miniChipText, { color: c.muted }]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function darkenChip(c: any) {
  return c.surface === colors.lightSurface ? '#F0F0F3' : '#222228';
}

function RoleCard({
  icon,
  title,
  body,
  onPress,
  c,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  onPress: () => void;
  active?: boolean;
  c: any;
}) {
  return (
    <Pressable style={[styles.roleCard, { backgroundColor: c.surface, borderColor: c.line }]} onPress={onPress}>
      <View style={styles.roleIcon}>
        <Ionicons name={icon} size={24} color={colors.blue} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.roleTitle, { color: c.text }]}>{title}</Text>
        <Text style={[styles.bodyText, { color: c.muted }]}>{body}</Text>
      </View>
      <Ionicons name="arrow-forward" size={18} color={c.muted} />
    </Pressable>
  );
}

function TopBack({ onPress, color }: { onPress: () => void; color: string }) {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <Ionicons name="arrow-back" size={21} color={color} />
    </Pressable>
  );
}

function Eyebrow({ text, color }: { text: string; color: string }) {
  return <Text style={[styles.eyebrow, { color }]}>{text}</Text>;
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
    </View>
  );
}

function Stat({ label, value, c }: { label: string; value: string; c: any }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.statValue, { color: c.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: c.muted }]}>{label}</Text>
    </View>
  );
}

function ReputationRow({ label, value, c }: { label: string; value: string; c: any }) {
  return (
    <View style={styles.reputationRow}>
      <Text style={[styles.bodyText, { color: c.muted }]}>{label}</Text>
      <Text style={[styles.reputationValue, { color: c.text }]}>{value}</Text>
    </View>
  );
}

function WorkCard({ tag, accent, c }: { tag: string; accent: string; c: any }) {
  return (
    <View style={[styles.workCard, { backgroundColor: accent }]}>
      <Text style={styles.workTag}>{tag}</Text>
      <View style={styles.workOverlay} />
      <View style={styles.workCircle} />
      <Text style={styles.workLabel}>{tag === 'AE' ? 'Motion system' : tag === 'UI' ? 'Brand world' : tag === '3D' ? 'Product visual' : 'Campaign cut'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  logoSquare: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: '#111113',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  logoVLeft: {
    position: 'absolute',
    width: 22,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#2F7BFF',
    transform: [{ rotate: '-30deg' }, { translateX: -8 }],
  },
  logoVRight: {
    position: 'absolute',
    width: 22,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#60C8FF',
    transform: [{ rotate: '30deg' }, { translateX: 8 }],
  },
  wordmark: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 2.4,
  },
  tagline: {
    marginTop: 7,
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 24,
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: '#2F7BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  onboardingContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  pagePad: {
    padding: 20,
    paddingBottom: 34,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  heroTitleSmall: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  heroBody: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 25,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  roleCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueSoft,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  textArea: {
    minHeight: 130,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  smallNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 18,
  },
  smallNoteText: {
    fontSize: 12,
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBrand: {
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: 1,
  },
  topMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: '#2F7BFF',
    right: 8,
    top: 7,
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 22,
    marginBottom: 26,
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroCardTitle: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heroTop: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  sectionTitleRow: {
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.25,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48.7%',
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
  },
  creatorCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  creatorTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  creatorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  creatorTitle: {
    fontSize: 13,
    marginTop: 2,
  },
  creatorMeta: {
    fontSize: 11,
    marginTop: 6,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 12,
  },
  miniChip: {
    borderRadius: 11,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  miniChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  searchBar: {
    marginTop: 18,
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 14,
  },
  filterPill: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 99,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  profileHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  bigAvatar: {
    width: 82,
    height: 82,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },
  rowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  profileName: {
    fontSize: 19,
    fontWeight: '700',
  },
  profileTitle: {
    fontSize: 14,
    marginTop: 4,
  },
  profileMeta: {
    fontSize: 12,
    marginTop: 6,
  },
  statRow: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    paddingVertical: 14,
    flexDirection: 'row',
    marginBottom: 18,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  reputationCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
  },
  reputationRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  reputationValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    flexShrink: 1,
  },
  workGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  workCard: {
    width: '48.5%',
    height: 142,
    borderRadius: 22,
    overflow: 'hidden',
    padding: 14,
    position: 'relative',
  },
  workTag: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    zIndex: 2,
  },
  workOverlay: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.14)',
    right: -36,
    bottom: -40,
  },
  workCircle: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 8,
    borderColor: 'rgba(255,255,255,0.22)',
    right: 26,
    top: 48,
  },
  workLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    position: 'absolute',
    bottom: 14,
    left: 14,
  },
  bottomActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  progressTrack: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 22,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 9,
  },
  optionList: {
    gap: 10,
  },
  optionRow: {
    borderWidth: 1,
    borderRadius: 18,
    minHeight: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionRowText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  budgetCard: {
    width: '48.5%',
    minHeight: 84,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetText: {
    fontSize: 16,
    fontWeight: '700',
  },
  stepActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 26,
  },
  notificationCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
  },
  notificationDot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: colors.blue,
    marginTop: 7,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  timeText: {
    fontSize: 11,
  },
  pageTitle: {
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: -0.7,
    marginTop: 4,
  },
  projectCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    marginTop: 12,
  },
  projectTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  projectIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  projectMeta: {
    fontSize: 12,
    marginTop: 3,
  },
  projectBudget: {
    fontSize: 15,
    fontWeight: '700',
  },
  statusLine: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: colors.green,
  },
  statusText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  messageRow: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  messageName: {
    fontSize: 14,
    fontWeight: '700',
  },
  switchRow: {
    flexDirection: 'row',
    gap: 9,
  },
  roleSwitch: {
    flex: 1,
    minHeight: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9E9ED',
  },
  roleSwitchText: {
    fontSize: 13,
    fontWeight: '700',
  },
  bottomTabs: {
    borderTopWidth: 1,
    paddingHorizontal: 7,
    paddingTop: 7,
    paddingBottom: Platform.OS === 'ios' ? 5 : 9,
    flexDirection: 'row',
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  bottomLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
});

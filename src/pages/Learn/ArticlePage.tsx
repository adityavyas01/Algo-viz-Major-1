import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Article, Algorithm } from '@/types/cms';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from '@/components/ui/card';
import { PageLoader } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/Quiz';
import { QuizResult } from '@/components/QuizResult';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import { Clock, Cpu, Award } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import VisualizationRenderer from '@/components/VisualizationRenderer';

// Dummy questions - in a real app, these would come from a database
const dummyQuestions = [
	{
		question: 'What is the primary advantage of this algorithm?',
		options: ['Speed', 'Low memory usage', 'Simplicity', 'Scalability'],
		correctAnswer: 'Simplicity',
	},
	{
		question: 'What is the worst-case time complexity?',
		options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'],
		correctAnswer: 'O(n^2)',
	},
	{
		question: 'Is this algorithm stable?',
		options: ['Yes', 'No'],
		correctAnswer: 'Yes',
	},
];

const ArticlePage: React.FC = () => {
	const { algorithmId } = useParams<{ algorithmId: string }>();
	const [article, setArticle] = useState<Article | null>(null);
	const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
	const [loading, setLoading] = useState(true);
	const [quizResult, setQuizResult] = useState<{
		score: number;
		correct: number;
		total: number;
	} | null>(null);
	const [certificate, setCertificate] = useState<{ verification_key: string } | null>(null);
	const { user } = useAuth();
	const { toast } = useToast();

	useEffect(() => {
		const fetchArticleAndProgress = async () => {
			if (!algorithmId) return;
			setLoading(true);

			try {
				const { data: articleData, error: articleError } = await supabase
					.from('articles')
					.select('*')
					.eq('algorithm_id', algorithmId)
					.single();
				if (articleError) throw articleError;
				setArticle(articleData);

				const { data: algoData, error: algoError } = await supabase
					.from('algorithms')
					.select('*, category:algorithm_categories(name)')
					.eq('id', algorithmId)
					.single();
				if (algoError) throw algoError;
				setAlgorithm(algoData as any);

				if (user) {
					const { data: progressData } = await supabase
						.from('user_quiz_progress')
						.select('score')
						.eq('user_id', user.id)
						.eq('algorithm_id', algorithmId)
						.single();
					if (progressData) {
						setQuizResult({ score: progressData.score, correct: 0, total: 0 }); // Simplified for display
					}
					const { data: certData } = await supabase
						.from('certificates')
						.select('verification_key')
						.eq('user_id', user.id)
						.eq('algorithm_id', algorithmId)
						.single();
					if (certData) {
						setCertificate(certData);
					}
				}
			} catch (error: any) {
				console.error('Error fetching data:', error);
				toast({ title: 'Error', description: 'Failed to load article data.', variant: 'destructive' });
			} finally {
				setLoading(false);
			}
		};

		fetchArticleAndProgress();
	}, [algorithmId, user, toast]);

	const handleQuizComplete = async (score: number, correct: number, total: number) => {
		setQuizResult({ score, correct, total });
		if (user && algorithmId) {
			await supabase.from('user_quiz_progress').upsert({
				user_id: user.id,
				algorithm_id: algorithmId,
				score: score,
			}, { onConflict: 'user_id, algorithm_id' });

			if (score >= 80 && !certificate) {
				const verification_key = `${user.id.slice(0, 4)}-${algorithmId.slice(0, 4)}-${Date.now()}`;
				const { data, error } = await supabase.from('certificates').insert({
					user_id: user.id,
					algorithm_id: algorithmId,
					verification_key: verification_key,
				}).select().single();

				if (error) {
					toast({ title: 'Error issuing certificate', description: error.message, variant: 'destructive' });
				} else {
					setCertificate(data);
					toast({ title: 'Certificate Awarded!', description: 'Congratulations, you have earned a certificate for this algorithm.' });
				}
			}
		}
	};

	const handleRetryQuiz = () => {
		setQuizResult(null);
	};

	if (loading) {
		return <PageLoader />;
	}

	if (!article || !algorithm) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
					<p>We couldn't find the content you're looking for.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
			<Header />
			<main className="container mx-auto px-4 py-12 max-w-5xl">
				<MotionWrapper variant="fadeInUp">
					<header className="mb-12 text-center">
						<Badge variant="secondary" className="mb-4 bg-cyan-500/20 text-cyan-300 border-none text-sm px-4 py-1">
							{algorithm.category?.name}
						</Badge>
						<h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
							{algorithm.name}
						</h1>
						<div className="flex items-center justify-center gap-6 text-white/70 mt-6">
							<div className="flex items-center gap-2">
								<Clock className="w-5 h-5 text-cyan-400" />
								<span>
									Time:{' '}
									<code className="bg-white/10 px-2 py-1 rounded-md text-white">
										{algorithm.complexity_time}
									</code>
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Cpu className="w-5 h-5 text-purple-400" />
								<span>
									Space:{' '}
									<code className="bg-white/10 px-2 py-1 rounded-md text-white">
										{algorithm.complexity_space}
									</code>
								</span>
							</div>
						</div>
					</header>
				</MotionWrapper>

				<MotionWrapper variant="fadeInUp" delay={0.2}>
					<Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
						<CardContent className="p-8 md:p-10">
							<div className="prose prose-invert max-w-none prose-h1:text-cyan-300 prose-h2:text-purple-300 prose-h3:text-white/90 prose-strong:text-white prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-code:bg-white/10 prose-code:text-white prose-code:p-1 prose-code:rounded-md prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/20">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
							</div>
						</CardContent>
					</Card>
				</MotionWrapper>

				<VisualizationRenderer algorithmName={algorithm.name} />

				<MotionWrapper variant="fadeInUp" delay={0.4}>
					<div className="mt-20">
						<div className="text-center mb-10">
							<h2 className="text-4xl font-bold flex items-center justify-center gap-3">
								<Award className="w-8 h-8 text-yellow-400" />
								Test Your Knowledge
							</h2>
							<p className="text-white/60 mt-2">Pass the quiz with 80% or more to earn a certificate.</p>
						</div>
						{!quizResult ? (
							<Quiz questions={dummyQuestions} algorithmId={algorithmId!} onQuizComplete={handleQuizComplete} />
						) : (
							<QuizResult
								score={quizResult.score}
								correctAnswers={quizResult.correct}
								totalQuestions={quizResult.total}
								onRetry={handleRetryQuiz}
								hasCertificate={!!certificate}
								certificateKey={certificate?.verification_key}
							/>
						)}
					</div>
				</MotionWrapper>
			</main>
			<Footer />
		</div>
	);
};

export default ArticlePage;

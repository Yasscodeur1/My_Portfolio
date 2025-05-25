<?php

namespace App\Http\Controllers;

use App\Models\Projet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projets = Projet::all();
        return inertia('Projets/Index', [
            'projets' => $projets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'nullble|array',
        ]);
        $projet = Projet::create([
            'title' => $request->title,
            'description' => $request->description,
            'github_link' => $request->github_link,
            'demo_link' => $request->demo_link,
            'image' => $request->file('image')->store('images', 'public'),
            'technologies' => ['React', 'Laravel', 'NextJs', 'HTML/css', 'HTML/css/JavaScript', 'Laravel/React'],
            'user_id' => auth()->id(),
        ]);


        return redirect()->route('projets.index')->with('success', 'Projet créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Projet $projet)
    {
        // $projets = Projet::all();
        // return inertia('Projets/Show', [
        //     'projet' => $projet,
        // ]);
        return Inertia::render('Projets/Show', [
            'projet' => $projet,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Projet $projet)
    {
        return inertia('Projets/Edit', [
            'projet' => $projet,
            'user' => auth()->user(),
            'technologiesList' => [
                'React' => 'React',
                'Laravel' => 'Laravel',
                'NextJs' => 'NextJs',
                'HTML/CSS' => 'HTML/CSS',
                'HTML/CSS/JavaScript' => 'HTML/CSS/JavaScript',
                'Laravel/React' => 'Laravel/React',
            ],
            
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Projet $projet)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'github_link' => 'nullable|url',
            'demo_link' => 'nullable|url',
            'image' => 'nullable|image|max:2048',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:255',
        ]);

        $projet->update([
            'title' => $request->title,
            'description' => $request->description,
            'github_link' => $request->github_link,
            'demo_link' => $request->demo_link,
            'technologies' => $request->technologies,
            'user_id' => auth()->id(),
        ]);

        if ($request->hasFile('image')) {
            $projet->image = $request->file('image')->store('images', 'public');
            $projet->save();
        }

        return redirect()->route('projets.index')->with('success', 'Projet mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Projet $projet)
    {
        $projet->delete();

        return redirect()->route('projets.index')->with('success', 'Projet supprimé avec succès.');
    }
}

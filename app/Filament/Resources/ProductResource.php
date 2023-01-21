<?php

namespace App\Filament\Resources;

use Closure;
use Filament\Forms;
use Filament\Tables;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Filament\Resources\Form;
use Filament\Resources\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use App\Filament\Resources\ProductResource\Pages;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use App\Filament\Resources\ProductResource\RelationManagers;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('category_id')
                    ->label('Category')
                    ->options(Category::all()->pluck('name', 'id'))
                    ->relationship('category', 'name')
                    ->searchable(),
                Select::make('discount_id')
                    ->label('Discount')
                    ->options(Category::all()->pluck('name', 'id'))
                    ->relationship('discount', 'name')
                    ->searchable(),
                Forms\Components\TextInput::make('name')
                    ->afterStateUpdated(function (Closure $get, Closure $set, ?string $state) {
                        if (!$get('is_slug_changed_manually') && filled($state)) {
                            $set('slug', Str::slug($state));
                        }
                    })
                    ->reactive()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('slug')
                    ->afterStateUpdated(function (Closure $set) {
                        $set('is_slug_changed_manually', true);
                    })
                    ->required()
                    ->disabled()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->required(),
                Forms\Components\TextInput::make('highlights')
                    ->required(),
                Forms\Components\TextInput::make('details')
                    ->required()
                    ->maxLength(255),
                FileUpload::make('images')
                    ->multiple()
                    ->maxFiles(4)
                    ->required(),
                Forms\Components\TextInput::make('weight')
                    ->numeric()
                    ->type('number')
                    ->required(),
                Forms\Components\TextInput::make('tax')
                    ->numeric()
                    ->type('number')
                    ->required(),
                Forms\Components\Toggle::make('featured')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images.0')
                    ->circular()
                    ->label('Image'),
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('category.name'),
                Tables\Columns\IconColumn::make('discount.active')
                    ->boolean(),
                Tables\Columns\IconColumn::make('featured')
                    ->boolean(),
                Tables\Columns\TextColumn::make('weight')
                    ->icon('heroicon-o-cube')
                    ->iconPosition('after'),
                Tables\Columns\TextColumn::make('tax')
                    ->icon('heroicon-o-receipt-tax')
                    ->iconPosition('after'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            'category' => RelationManagers\CategoryRelationManager::class,
            'discount' => RelationManagers\DiscountRelationManager::class,
            'prices' => RelationManagers\PricesRelationManager::class,
            'variants' => RelationManagers\VariantsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
